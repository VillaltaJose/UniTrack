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
		return await this._supabase.client.functions.invoke('listar-cuentas',
			{
				headers: {
					'Id-Directiva': '33aef518-aa0e-469f-967e-45954733d9bb'
				}
			})
	}

}
