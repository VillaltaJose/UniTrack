import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NuevaCuentaComponent } from '../nueva-cuenta/nueva-cuenta.component';

@Component({
	selector: 'app-listado-cuentas',
	templateUrl: './listado-cuentas.component.html',
	styleUrls: ['./listado-cuentas.component.scss'],
})
export class ListadoCuentasComponent implements OnInit {

	constructor(
		private _drawer: NzDrawerService,
	) { }

	ngOnInit() { }

	abrirDrawerNuevaCuenta() {
		const drawer = this._drawer.create({
			nzContent: NuevaCuentaComponent,
			nzPlacement: 'right',
			nzWidth: '500px',
		})
	}

}
