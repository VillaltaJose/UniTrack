import { createClient } from "https://esm.sh/@supabase/supabase-js";

export class SupabaseProvider {

	constructor(url, key) {
		this.client = createClient(url, key)
	}

	async verificarPermiso(idDirectiva, idUsuario, idPermiso) {
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