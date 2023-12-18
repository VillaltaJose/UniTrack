import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-nuevo-movimiento',
	templateUrl: './nuevo-movimiento.component.html',
	styleUrls: ['./nuevo-movimiento.component.scss'],
})
export class NuevoMovimientoComponent {

	form: FormGroup
	error: string | null = null
	loading = {
		guardar: false,
	}

	constructor() {
		this.form = new FormGroup({})
	}

	registrarMovimiento() {

	}

}
