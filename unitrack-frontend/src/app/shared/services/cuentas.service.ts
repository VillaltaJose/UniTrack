import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { StorageKeys, StorageService } from './storage.service';

@Injectable({
	providedIn: 'root',
})
export class CuentasService {

	constructor(
		private _supabase: SupabaseService,
		private _storage: StorageService,
	) {}

	async obtenerCuentas() {
		const resp = await this._supabase.client.functions.invoke('listar-cuentas',
			{
				headers: {
					'Id-Directiva': this._storage.getStorage(StorageKeys.ID_DIRECTIVA)
				}
			});

		if (resp.error) {
			const errResponse = JSON.parse(await new Response(resp.error.context.body).text())
			resp.error.message = errResponse || resp.error.message
		}

		return resp
	}

	async agregarCuenta(cuenta: any) {
		try {
			const resp = await this._supabase.client.functions.invoke('agregar-cuenta',
			{
				headers: {
					'Id-Directiva': this._storage.getStorage(StorageKeys.ID_DIRECTIVA)
				},
				body: cuenta
			});

			console.log(resp)

			if (resp.error) {
				const errResponse = JSON.parse(await new Response(resp.error.context.body).text())
				resp.error.message = errResponse || resp.error.message
			}

			return resp
		} catch (err: any) {
			return {error: {message: err.toString()}, data: null}
		}
	}

}
