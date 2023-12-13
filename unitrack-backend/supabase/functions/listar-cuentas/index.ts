import { corsHeaders } from '../_shared/cors.ts'
import { createClient } from "https://esm.sh/@supabase/supabase-js";

let client: SupabaseClient = null;

Deno.serve(async (req: Request) => {
	if (req.method === "OPTIONS") {
		return new Response("ok", { headers: corsHeaders });
	}

	try {
		client = createClient(Deno.env.get("URL") ?? '', Deno.env.get("ANON_KEY") ?? '');

		const global = {
			idDirectiva: req.headers.get('Id-Directiva'),
			session: (await client.auth.getUser(req.headers.get('Authorization')!.replace('Bearer ', ''))).data.user
		}

		const tienePermiso = await verificarPermiso(global.idDirectiva, global.session.id, '6c1f989f-5e26-4317-89a8-fcedd8890fa0');

		if (!tienePermiso) {
			return new Response(String('No tiene permiso para visualizar las cuentas financieras de la directiva'), {
				headers: { ...corsHeaders, "Content-Type": "application/json" },
				status: 401
			});
		}

		const { data, error } = await client.from('cuentas')
			.select(`
				id,
				alias,
				saldo,
				numero_cuenta,
				id_propietario,
				tipo_cuenta,
				institucion:instituciones_financieras!inner(
					nombre
				)
			`)
			.eq('id_directiva', global.idDirectiva)
			.order('id', { ascending: true });

		if (error) {
			throw error;
		}

		return new Response(JSON.stringify(data), {
			headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			status: 200,
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), {
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: 400,
		});
	}
});

const verificarPermiso = async (idDirectiva, idUsuario, idPermiso) => {
	if (!client) return false

	const { data, error } = await client.rpc('verificar_permiso', {
		pv_id_directiva: idDirectiva,
		pv_id_usuario: idUsuario,
		pv_id_permiso: idPermiso
	}).select('*')

	if (error) return false
		
	return data.length > 0
}