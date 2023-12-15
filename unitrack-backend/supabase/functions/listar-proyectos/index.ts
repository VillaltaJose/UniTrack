import { PERMISOS } from './../_shared/permissions.ts';
import { SupabaseProvider } from "./../_shared/client.ts";
import { okResponse, errorResponse } from "./../_shared/responses.ts";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req: Request) => {
	if (req.method === "OPTIONS") {
		return new Response("ok", { headers: corsHeaders });
	}

	try {
		const supabase = new SupabaseProvider(
			Deno.env.get("URL") ?? "",
			Deno.env.get("ANON_KEY") ?? ""
		);

		const global = {
			idDirectiva: req.headers.get("Id-Directiva")?.toString() || "",
			session: (
				await supabase.client.auth.getUser(
					req.headers.get("Authorization")!.replace("Bearer ", "")
				)
			).data.user,
		};

		const params = await req.json();

		const tienePermiso = await supabase.verificarPermiso(
			global.idDirectiva,
			global.session!.id,
			PERMISOS.PROYECTOS.VER
		);

		if (!tienePermiso) {
			return errorResponse(
				"No tiene permiso para visualizar los proyectos"
			);
		}

		/**
		 * Validar si puede ver los permisos de la directiva (diferente a la suya)
		 * mediante el campo de reporta_a
		 */
		if (params.idDirectiva && params.idDirectiva !== global.idDirectiva) {
			const puedeVer = await supabase.esDirectivaPadre(global.idDirectiva, params.idDirectiva);

			if (!puedeVer) return errorResponse("No tiene permiso para visualizar los proyectos de la directiva indicada");
		}
		// Fin validacion

		const query = supabase.client
			.from('proyectos')
			.select(
				`
				id,
				nombre,
				fechaInicio:fecha_inicio,
				fechaFin:fecha_fin,
				fechaUltAct:fecha_ult_actualizacion,
				directiva:directivas!inner ( nombre, avatar:avatar_url ),
				usuario:perfiles (nombre, avatar:avatar_url),
				estado:estados_proyectos (descripcion, color)
			`
			)
			.order('fecha_inicio,created_at', { ascending: true });

		if (!params.idDirectiva) {
			params.idDirectiva = global.idDirectiva;
		}

		query.or(`reporta_a.eq.${params.idDirectiva},id.eq.${params.idDirectiva}`, {referencedTable: 'directivas'})
		
		if (params.idEstado) {
			query.eq(`id_estado`, `${params.idEstado}`)
		}

		if (params.nombre) {
			query.ilike(`nombre`, `%${params.nombre.trim().replace(' ', '%')}%`)
		}

		if (params.fechaInicio) {
			query.or(`fecha_inicio.gte.${params.fechaInicio},fecha_fin.gte.${params.fechaInicio}`)
		}
		
		if (params.fechaFin) {
			query.or(`fecha_inicio.lte.${params.fechaFin},fecha_fin.lte.${params.fechaFin}`)
		}

		const { data, error } = await query

		if (error) {
			throw error;
		}

		return okResponse(data);
	} catch (err) {
		console.error(err);
		return errorResponse(err.message || err.details || JSON.stringify(err));
	}
});
