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

		if (!params.idProyecto) {
			return errorResponse(
				'Debe indicar el ID del proyecto a visualizar'
			);
		}

		const tienePermiso = await supabase.verificarPermiso(
			global.idDirectiva,
			global.session!.id,
			PERMISOS.PROYECTOS.VER_HISTORIAL
		);

		if (!tienePermiso) {
			return errorResponse(
				'No tiene permiso para visualizar el historial de cambios de proyectos'
			);
		}

		/**
		 * Validar si puede ver el proyecto (diferente a la suya)
		 * mediante el campo de reporta_a
		 */
		if (params.idDirectiva && params.idDirectiva !== global.idDirectiva) {
			const { data: metadata } = await supabase.client.from('proyectos').select('idDirectiva:id_directiva').eq('id', params.idProyecto).single();
			console.log(metadata)
			const puedeVer = await supabase.esDirectivaPadre(global.idDirectiva, metadata?.idDirectiva);

			if (!puedeVer) return errorResponse('No tiene permiso para visualizar el historial de cambios del proyecto indicado');
		}
		// Fin validacion

		const { data, error } = await supabase.client
			.from('historial_proyectos')
			.select(
				`
				fecha,
				comentario,
				usuario:perfiles!inner (nombre, avatar:avatar_url),
				estado:estados_proyectos (descripcion, color)
			`
			)
			.eq('id_proyecto', params.idProyecto)
			.order('fecha', { ascending: false });

		if (error) {
			throw error;
		}

		return okResponse(data);
	} catch (err) {
		console.error(err);
		return errorResponse(err.message || err.details || JSON.stringify(err));
	}
});
