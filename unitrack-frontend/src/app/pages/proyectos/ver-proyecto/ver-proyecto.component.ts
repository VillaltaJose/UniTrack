import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProyectosService } from 'src/app/shared/services/proyectos.service';

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.scss']
})
export class VerProyectoComponent implements AfterViewInit {

	@Input('id') idProyecto!: string

	error: string | null = null
	loading = {
		proyecto: true,
		historial: false,
		guardar: false,
	}
	edicion: boolean = false
	formProyecto: FormGroup

	proyecto: any = null
	historial: any[] = []

	constructor(
		private _proyecto: ProyectosService,
	) {
		this.formProyecto = new FormGroup({
			id: new FormControl(this.idProyecto, []),
			nombre: new FormControl(null, [Validators.required]),
			descripcion: new FormControl(null, [Validators.required]),
			fechaInicio: new FormControl(null, []),
			fechaFin: new FormControl(null, []),
			idEstado: new FormControl(null, [Validators.required]),
			comentario: new FormControl(null, [Validators.required]),
		})
	}

	async ngAfterViewInit() {
		await this.obtenerProyecto()
	}

	async obtenerProyecto() {
		this.loading.proyecto = true
		this.loading.historial = false

		this.edicion = false

		const { data: proyecto, error } = await this._proyecto.obtenerProyecto(this.idProyecto)

		this.loading.proyecto = false

		if (error) {
			this.error = error.message

			return
		}

		this.proyecto = proyecto

		this.obtenerHistorial()
	}

	async obtenerHistorial() {
		this.loading.historial = true

		const { data: historial, error } = await this._proyecto.obtenerHistorial(this.idProyecto)

		this.loading.historial = false

		if (error) {
			this.error = error.message

			return
		}

		this.historial = historial
	}

	async guardarCambios() {
		if (this.formProyecto.invalid) {
			this.error = 'Los campos marcados son obligatorios'
			this.formProyecto.markAllAsTouched()
			return
		}

		this.loading.guardar = true
		this.error = null
		const proyecto = this.formProyecto.getRawValue()

		const { data, error } = await this._proyecto.actualizarProyecto(proyecto)

		console.log(data)

		this.loading.guardar = false

		if (error) {
			this.error = error.message

			return
		}

		this.obtenerProyecto()
	}

	mostrarFormProyecto() {
		this.colocarFormProyecto()
		this.edicion = true
	}

	borrarCambios() {
		this.colocarFormProyecto()
		this.edicion = false
	}

	private colocarFormProyecto() {
		this.formProyecto.setValue({
			id: this.proyecto.id,
			nombre: this.proyecto.nombre,
			descripcion: this.proyecto.descripcion,
			fechaInicio: this.proyecto.fechaInicio,
			fechaFin: this.proyecto.fechaFin,
			idEstado: this.proyecto.estado.id,
			comentario: null,
		})
	}

}
