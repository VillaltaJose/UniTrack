import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NuevoMovimientoComponent } from '../nuevo-movimiento/nuevo-movimiento.component';
import { CuentasService } from 'src/app/shared/services/cuentas.service';

@Component({
	selector: 'app-listado-movimientos',
	templateUrl: './listado-movimientos.component.html',
	styleUrls: ['./listado-movimientos.component.scss'],
})
export class ListadoMovimientosComponent implements OnInit {

	loading: boolean = true
	error: string | null = null
	movimientos: any[] = []

	constructor(
		private _nzDrawer: NzDrawerService,
		private _cuentaService: CuentasService,
	) {

	}

	async ngOnInit() {
		await this.obtenerMovimientos()
	}

	abrirDrawerNuevoMovimiento() {
		this._nzDrawer.create({
			nzContent: NuevoMovimientoComponent,
			nzWidth: '450px'
		})
	}

	async obtenerMovimientos() {
		this.loading = true

		const { data, error } = await this._cuentaService.obtenerMovimientos({})

		this.loading = false

		if (error) {
			this.error = error.message
			return
		}

		console.log(data)

		this.movimientos = data
	}

}
