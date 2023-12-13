import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
	providedIn: 'root',
})
export class CuentasService {

	constructor(
		private _supabase: SupabaseService,
	) {}

	async obtenerCuentas() {
		const resp = await this._supabase.client.functions.invoke('listar-cuentas',
			{
				headers: {
					'Id-Directiva': '33aef518-aa0e-469f-967e-45954733d9bb'
				}
			});

		if (resp.error) {
			const errResponse = JSON.parse(await new Response(resp.error.context.body).text())
			resp.error.message = errResponse || resp.error.message
		}

		return resp
	}

	async agregarCuenta(cuenta: any) {
		const resp = await this._supabase.client.functions.invoke('agregar-cuenta',
			{
				headers: {
					'Id-Directiva': '33aef518-aa0e-469f-967e-45954733d9bb'
				},
				body: cuenta
			});

		if (resp.error) {
			const errResponse = JSON.parse(await new Response(resp.error.context.body).text())
			resp.error.message = errResponse || resp.error.message
		}

		return resp
	}

}
