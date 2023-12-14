import { SupabaseClient, createClient } from "https://esm.sh/@supabase/supabase-js";

export class SupabaseProvider {
	client: SupabaseClient;

	constructor(url: string, key: string) {
		this.client = createClient(url, key)
	}

	async verificarPermiso(idDirectiva: string, idUsuario: string, idPermiso: string) {
		if (!this.client) return false
	
		const { data, error } = await this.client.rpc('verificar_permiso', {
			pv_id_directiva: idDirectiva,
			pv_id_usuario: idUsuario,
			pv_id_permiso: idPermiso
		}).select('*')
	
		if (error) return false
			
		return data.length > 0
	}
}