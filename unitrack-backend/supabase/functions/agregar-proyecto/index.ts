import { PERMISOS } from './../_shared/permissions.ts';
import { errorResponse, okResponse } from "./../_shared/responses.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { SupabaseProvider } from "../_shared/client.ts";

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

		const tienePermiso = await supabase.verificarPermiso(
			global.idDirectiva,
			global.session!.id,
			PERMISOS.PROYECTOS.CREAR
		);

		if (!tienePermiso) {
			return errorResponse(
				'No tiene permiso para crear nuevos proyectos'
			);
		}

		const params = await req.json();

		const idEstadoInicial = '0b9e331e-ac52-40eb-9e7c-6e8b3dbbcc4a';

		// TODO: Cambiar el ID de estado por el de la tabla de estados
		const proyecto = {
			id_usuario_crea: global.session!.id,
			id_directiva: global.idDirectiva,
			nombre: params.nombre,
			descripcion: params.descripcion,
			id_estado: idEstadoInicial,
			fecha_inicio: params.fechaInicio,
			fecha_fin: params.fechaFin,
			fecha_ult_actualizacion: new Date(),
		}

		const { data: proyectoCreado, error } = await supabase.client.from('proyectos').insert(proyecto).select();

		if (error) {
			throw error;
		}

		const historico = {
			id_usuario: global.session!.id,
			id_proyecto: proyectoCreado![0].id,
			id_estado: idEstadoInicial,
			fecha: new Date(),
			comentario: `Creación de proyecto: ${proyecto.nombre}`,
		}

		const resp = await supabase.client.from('historial_proyectos').insert(historico);

		if (resp.error) {
			console.error(resp.error);
		}

		return okResponse(
			`El proyecto ${proyecto.nombre} ha sido creado exitosamente`
		);
	} catch (err) {
		console.error(err);
		return errorResponse(err.message || err.details || JSON.stringify(err));
	}
});
