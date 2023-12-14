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
			"6c1f989f-5e26-4317-89a8-fcedd8890fa0"
		);

		if (!tienePermiso) {
			return errorResponse(
				"No tiene permiso para visualizar las cuentas financieras de la directiva"
			);
		}

		const { data, error } = await supabase.client
			.from("cuentas")
			.select(
				`
				id,
				alias,
				saldo,
				numero_cuenta,
				id_propietario,
				tipo_cuenta,
				institucion:instituciones_financieras!inner(
					nombre
				)
			`
			)
			.eq("id_directiva", global.idDirectiva)
			.order("id", { ascending: true });

		if (error) {
			throw error;
		}

		return okResponse(data);
	} catch (err) {
		console.error(err);
		return errorResponse(err.message || err.details || JSON.stringify(err));
	}
});
