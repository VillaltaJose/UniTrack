import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { VerProyectoComponent } from '../ver-proyecto/ver-proyecto.component';
import { ProyectosService } from 'src/app/shared/services/proyectos.service';
import { FormControl, FormGroup } from '@angular/forms';
import { NuevoProyectoComponent } from '../nuevo-proyecto/nuevo-proyecto.component';

@Component({
  selector: 'app-listado-proyectos',
  templateUrl: './listado-proyectos.component.html',
  styleUrls: ['./listado-proyectos.component.scss']
})
export class ListadoProyectosComponent implements OnInit {

	fecha = new Date()
	loading: boolean = true
	proyectos: any[] = []

	formFiltros: FormGroup

	constructor(
		private _drawer: NzDrawerService,
		private _proyectos: ProyectosService,
	) {
		this.formFiltros = new FormGroup({
			idDirectiva: new FormControl(null, []),
			idEstado: new FormControl(null, []),
			nombre: new FormControl(null, []),
			fechaInicio: new FormControl(null, []),
			fechaFin: new FormControl(null, []),
		})
	}

	async ngOnInit() {
		await this.obtenerProyectos()
	}

	async obtenerProyectos() {
		if (this.formFiltros.invalid) return

		this.loading = true

		const { data, error } = await this._proyectos.obtenerProyectos(this.formFiltros.getRawValue())

		this.loading = false

		if (error) {
			console.error(error)
			return
		}

		console.log(data)
		this.proyectos = data
	}

	abrirDrawerProyecto(id: string) {
		this._drawer.create({
			nzContent: VerProyectoComponent,
			nzWidth: '600px',
			nzContentParams: { idProyecto: id },
		})
	}

	abrirDrawerNuevoProyecto() {
		const drawer = this._drawer.create({
			nzContent: NuevoProyectoComponent,
			nzWidth: '500px',
		})

		drawer.afterClose.subscribe((data) => {
			if (data) {
				this.obtenerProyectos()
			}
		})
	}

}
