import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { StorageKeys, StorageService } from './storage.service';

@Injectable({
	providedIn: 'root',
})
export class ProyectosService {

	constructor(
		private _supabase: SupabaseService,
		private _storage: StorageService,
	) {}

	async obtenerProyectos(filters: any) {
		const resp = await this._supabase.client.functions.invoke('listar-proyectos',
			{
				headers: {
					'Id-Directiva': this._storage.getStorage(StorageKeys.ID_DIRECTIVA)
				},
				body: filters
			});

		if (resp.error) {
			const errResponse = JSON.parse(await new Response(resp.error.context.body).text())
			resp.error.message = errResponse || resp.error.message
		}

		return resp
	}

}
