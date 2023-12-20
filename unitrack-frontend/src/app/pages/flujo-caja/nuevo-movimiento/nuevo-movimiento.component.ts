import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
		this.form = new FormGroup({
			idProyecto: new FormControl(null, [Validators.required]),
			idCuenta: new FormControl(null, [Validators.required]),
			motivo: new FormControl(null, [Validators.required]),
			tipoMovimiento: new FormControl('E', [Validators.required]),
			monto: new FormControl(null, [Validators.required]),
		})
	}

	async registrarMovimiento() {
		if (this.form.invalid) {
			this.error = 'Los campos marcados son obligatorios'
			this.form.markAllAsTouched()
			return
		}

		console.log(this.form.getRawValue())
	}

}
