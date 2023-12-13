import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { TIPOS_CUENTAS } from 'src/app/shared/constants/tipos_cuentas';
import { CuentasService } from 'src/app/shared/services/cuentas.service';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
	selector: 'app-nueva-cuenta',
	templateUrl: './nueva-cuenta.component.html',
	styleUrls: ['./nueva-cuenta.component.scss'],
})
export class NuevaCuentaComponent {

	form: FormGroup
	instituciones: any[] | null = []
	nzFilterOption = (): boolean => true;

	tiposCuentas = TIPOS_CUENTAS

	error: string | null = null
	loading = {
		guardar: false,
		instituciones: false,
	}

	constructor(
		private _supabase: SupabaseService,
		private _drawerRef: NzDrawerRef,
		private _cuentaService: CuentasService,
	) {
		this.form = new FormGroup({
			id_institucion: new FormControl(null, [Validators.required]),
			alias: new FormControl(null, [Validators.required]),
			numero_cuenta: new FormControl(null, [Validators.required]),
			id_propietario: new FormControl(null, [Validators.required]),
			tipo_cuenta: new FormControl(null, [Validators.required]),
			saldo_inicial: new FormControl(null, [Validators.required]),
			saldo: new FormControl(null, []),
		})
	}

	async obtenerInstituciones(busqueda: string) {
		if (busqueda.length < 3) return

		this.loading.instituciones = true

		await this._supabase.client.from('instituciones_financieras')
		.select('id, nombre')
		.like('nombre', `%${busqueda.toUpperCase()}%`)
		.then(({ data: instituciones, error }) => {
			this.loading.instituciones = false

			if (error) {
				this.error = error.message
				return
			}

			this.instituciones = instituciones
		})
	}

	async crearCuenta() {
		this.error = null

		if (this.form.invalid) {
			this.error = 'Los campos marcados son obligatorios'
			this.form.markAllAsTouched()
			return
		}

		this.loading.guardar = true

		const cuenta = this.form.getRawValue()
		cuenta.saldo = cuenta.saldo_inicial

		const { error } = await this._cuentaService.agregarCuenta(cuenta)

		if (error) {
			this.error = error.message
			return
		}

		this._drawerRef.close(cuenta)
	}

}
