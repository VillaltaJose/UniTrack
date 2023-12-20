import { Component, forwardRef } from '@angular/core';
import { CommonSelect } from '../common-select';
import { ProyectosService } from 'src/app/shared/services/proyectos.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-select-proyecto',
	templateUrl: './select-proyecto.component.html',
	styleUrls: ['./select-proyecto.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useExisting: forwardRef(() => SelectProyectoComponent)
	}]
})
export class SelectProyectoComponent extends CommonSelect<string> {

	isLoading: boolean = false;
	proyectos: any[] = [];
	error: string | null = null;

	constructor(private _proyectoService: ProyectosService) {
		super();
	}

	async obtenerProyectos(nombre: string) {
		if (nombre.length < 3) {
			return;
		}

		this.isLoading = true;

		const { data, error } = await this._proyectoService.obtenerProyectosSelect({ nombre });

		this.isLoading = false;

		if (error) {
			this.error = error.message;
			return;
		}

		this.proyectos = data;
	}
}
