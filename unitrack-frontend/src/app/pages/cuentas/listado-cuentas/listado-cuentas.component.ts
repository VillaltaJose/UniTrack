import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NuevaCuentaComponent } from '../nueva-cuenta/nueva-cuenta.component';
import { SupabaseService } from 'src/app/shared/services/supabase.service';
import { CuentasService } from 'src/app/shared/services/cuentas.service';

@Component({
	selector: 'app-listado-cuentas',
	templateUrl: './listado-cuentas.component.html',
	styleUrls: ['./listado-cuentas.component.scss'],
})
export class ListadoCuentasComponent implements OnInit {

	loading: boolean = false
	cuentas: any[] = []
	idDirectiva: string = '33aef518-aa0e-469f-967e-45954733d9bb'

	constructor(
		private _drawer: NzDrawerService,
		private _supabase: SupabaseService,
		private _cuentaService: CuentasService,
	) { }

	async ngOnInit() {
		await this.obtenerCuentas()
	}

	async obtenerCuentas() {
		this.loading = true

		const { data, error } = await this._cuentaService.obtenerCuentas()

		this.loading = false

		if (error) {
			console.error(error)
			return
		}

		console.log(data)
		this.cuentas = data
	}

	abrirDrawerNuevaCuenta() {
		const drawer = this._drawer.create({
			nzContent: NuevaCuentaComponent,
			nzPlacement: 'right',
			nzWidth: '500px',
		})

		drawer.afterClose.subscribe((data) => {
			if (data) {
				this.obtenerCuentas()
			}
		})
	}

}
