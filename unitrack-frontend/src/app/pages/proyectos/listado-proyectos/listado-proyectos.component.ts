import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { VerProyectoComponent } from '../ver-proyecto/ver-proyecto.component';

@Component({
  selector: 'app-listado-proyectos',
  templateUrl: './listado-proyectos.component.html',
  styleUrls: ['./listado-proyectos.component.scss']
})
export class ListadoProyectosComponent implements OnInit {

	fecha = new Date()

	constructor(
		private _drawer: NzDrawerService,
	) { }

	ngOnInit() {

	}

	abrirDrawerProyecto(codigo: number) {
		this._drawer.create({
			nzContent: VerProyectoComponent,
			nzWidth: '600px',
		})
	}

}
