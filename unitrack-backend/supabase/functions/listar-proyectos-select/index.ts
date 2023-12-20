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

		const query = supabase.client
			.from('proyectos')
			.select(
				`
				id,
				nombre
			`
			)
			.eq('id_directiva', global.idDirectiva)
			.order('fecha_inicio,created_at', { ascending: true });

		if (params.nombre) {
			query.ilike(`nombre`, `%${params.nombre.trim().replace(' ', '%')}%`)
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
