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
			"2077f96c-f6ea-4c3e-abd6-d8f0469e5223"
		);

		if (!tienePermiso) {
			return errorResponse(
				"No tiene permiso para registrar cuentas financieras de la directiva"
			);
		}

		const cuenta = await req.json();
		cuenta.id_directiva = global.idDirectiva;

		if (cuenta.tipo_cuenta !== "1" && cuenta.tipo_cuenta !== "2") {
			cuenta.tipo_cuenta = 1;
		}

		const { error } = await supabase.client.from("cuentas").insert(cuenta);

		if (error) {
			throw error;
		}

		return okResponse(
			`La cuenta ${cuenta.alias} ha sido registrada exitosamente`
		);
	} catch (err) {
		console.error(err);
		return errorResponse(err.message || err.details || JSON.stringify(err));
	}
});
