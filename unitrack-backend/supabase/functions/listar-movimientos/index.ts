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

		const tienePermiso = await supabase.verificarPermiso(
			global.idDirectiva,
			global.session!.id,
			PERMISOS.MOVIMIENTOS.VER
		);

		if (!tienePermiso) {
			return errorResponse(
				"No tiene permiso para visualizar los movimientos de la directiva"
			);
		}

		const { data, error } = await supabase.client
			.from("movimientos")
			.select(
				`
				id,
				cuenta:cuentas!inner (
					alias
				),
				monto,
				proyecto:proyectos (
					nombre
				),
				usuario:perfiles (
					nombre,
					avatar:avatar_url
				),
				fecha,
				motivo
			`
			)
			.or(`id_directiva.eq.${global.idDirectiva}`, {referencedTable: 'cuentas'})
			.order('fecha', { ascending: true });

		if (error) {
			throw error;
		}

		return okResponse(data);
	} catch (err) {
		console.error(err);
		return errorResponse(err.message || err.details || JSON.stringify(err));
	}
});
