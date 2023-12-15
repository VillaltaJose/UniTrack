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

	async esDirectivaPadre(idDirectivaPadre: string, idDirectivaHija: string) {
		if (!this.client) return false

		console.log(idDirectivaPadre, idDirectivaHija)
		const { count, error } = await this.client.from('directivas')
		.select('*', { count: 'exact', head: true })
		.eq('id', idDirectivaHija)
		.eq('reporta_a', idDirectivaPadre)
	
		if (error) {
			console.error(error)
			return false
		}

		if (!count) return false

		return count > 0
	}
}