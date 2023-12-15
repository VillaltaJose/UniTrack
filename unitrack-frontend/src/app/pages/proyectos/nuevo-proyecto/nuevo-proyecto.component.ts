import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { ProyectosService } from 'src/app/shared/services/proyectos.service';

@Component({
	selector: 'app-nuevo-proyecto',
	templateUrl: './nuevo-proyecto.component.html',
	styleUrls: ['./nuevo-proyecto.component.scss'],
})
export class NuevoProyectoComponent {

	error: string | null = null
	loading = {
		guardar: false,
	}

	form: FormGroup

	constructor(
		private _proyecto: ProyectosService,
		private _drawerRef: NzDrawerRef,
	) {
		this.form = new FormGroup({
			nombre: new FormControl(null, [Validators.required]),
			descripcion: new FormControl(null, [Validators.required]),
			fechaInicio: new FormControl(null, []),
			fechaFin: new FormControl(null, []),
		})
	}

	async crearProyecto() {
		this.error = null

		if (this.form.invalid) {
			this.error = 'Los campos marcados son obligatorios'
			this.form.markAllAsTouched()
			return
		}

		this.loading.guardar = true

		const cuenta = this.form.getRawValue()
		cuenta.saldo = cuenta.saldo_inicial

		const { data, error } = await this._proyecto.crearProyecto(cuenta)

		this.loading.guardar = false

		if (error) {
			this.error = error.message

			return
		}

		this._drawerRef.close(cuenta)
	}
}
