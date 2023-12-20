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

		if (!params.comentario) {
			return errorResponse("El comentario es requerido");
		}
		
		if (!params.id) {
			return errorResponse("Debe especificar el ID del proyecto");
		}

		const tienePermiso = await supabase.verificarPermiso(
			global.idDirectiva,
			global.session!.id,
			PERMISOS.PROYECTOS.EDITAR
		);

		if (!tienePermiso) {
			return errorResponse(
				"No tiene permiso para modificar los proyectos"
			);
		}

		// Obtenemos el proyecto para ver si hay cambios
		const { data: proyecto, error: errProyecto } = await supabase.client
			.from('proyectos')
			.select(`
				id,
				idDirectiva:id_directiva,
				nombre,
				descripcion,
				fechaInicio:fecha_inicio,
				fechaFin:fecha_fin,
				idEstado:id_estado
			`)
			.eq(`id`, params.id)
			.single()

		if (errProyecto) {
			return errorResponse(errProyecto.message || errProyecto.details || errProyecto);
		}

		/**
		 * Validar si puede ver los permisos de la directiva (diferente a la suya)
		 * mediante el campo de reporta_a
		 */
		if (proyecto.idDirectiva !== global.idDirectiva) {
			const puedeVer = await supabase.esDirectivaPadre(global.idDirectiva, proyecto.idDirectiva);

			if (!puedeVer) return errorResponse("No tiene permiso para modificar el proyecto");
		}
		// Fin validacion

		// Verificamos cuales son los cambios existentes:
		let cambios = ''

		if (proyecto.nombre !== params.nombre) cambios += `Nombre: ${proyecto.nombre} -> ${params.nombre} \n`
		if (proyecto.descripcion !== params.descripcion) cambios += `Descripcion: ${proyecto.descripcion} -> ${params.descripcion} \n`
		if (proyecto.fechaInicio !== params.fechaInicio) cambios += `Fecha Inicio: ${proyecto.fechaInicio} -> ${params.fechaInicio} \n`
		if (proyecto.fechaFin !== params.fechaFin) cambios += `Fecha Fin: ${proyecto.fechaFin} -> ${params.fechaFin} \n`

		// Actualizamos el proyecto
		const { error } = await supabase.client
			.from("proyectos")
			.update({
				nombre: params.nombre,
				descripcion: params.descripcion,
				fecha_inicio: params.fechaInicio,
				fecha_fin: params.fechaFin,
				fecha_ult_actualizacion: new Date(),
				id_estado: params.idEstado,
			})
			.match({ id: params.id });

		if (error) {
			return errorResponse(error.message || error.details || error)
		}

		const historico = {
			id_usuario: global.session!.id,
			id_proyecto: params.id,
			id_estado: params.idEstado,
			fecha: new Date(),
			comentario: `${cambios.length > 0 ? 'Se realizaron las siguientes modificaciones: \n' + cambios + '\n' : ''}${params.comentario}`,
		}

		const resp = await supabase.client.from('historial_proyectos').insert(historico);

		if (resp.error) {
			console.log(historico)
			console.error(resp.error);
		}

		return okResponse('El proyecto ha sido actualizado exitosamente');
	} catch (err) {
		console.error(err);
		return errorResponse(err.message || err.details || JSON.stringify(err));
	}
});
