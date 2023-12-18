import { Component } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NuevoMovimientoComponent } from '../nuevo-movimiento/nuevo-movimiento.component';

@Component({
	selector: 'app-listado-movimientos',
	templateUrl: './listado-movimientos.component.html',
	styleUrls: ['./listado-movimientos.component.scss'],
})
export class ListadoMovimientosComponent {

	constructor(
		private _nzDrawer: NzDrawerService,
	) {

	}

	abrirDrawerNuevoMovimiento() {
		this._nzDrawer.create({
			nzContent: NuevoMovimientoComponent,
			nzWidth: '450px'
		})
	}

}
