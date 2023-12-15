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
	}

	formComentario: FormGroup

	proyecto: any = null
	historial: any[] = []

	constructor(
		private _proyecto: ProyectosService,
	) {
		this.formComentario = new FormGroup({
			idEstado: new FormControl(null, [Validators.required]),
		})
	}

	async ngAfterViewInit() {
		await this.obtenerProyecto()
	}

	async obtenerProyecto() {
		this.loading.proyecto = true

		const { data: proyecto, error } = await this._proyecto.obtenerProyecto(this.idProyecto)

		this.loading.proyecto = false

		if (error) {
			this.error = error.message

			return
		}

		this.proyecto = proyecto
		this.formComentario.get('idEstado')?.setValue(proyecto.idEstado)

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

}
