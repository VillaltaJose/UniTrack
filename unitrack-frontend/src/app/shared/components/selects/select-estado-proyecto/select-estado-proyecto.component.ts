import { AfterViewInit, Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SupabaseService } from 'src/app/shared/services/supabase.service';
import { CommonSelect } from '../common-select';

@Component({
	selector: 'app-select-estado-proyecto',
	templateUrl: './select-estado-proyecto.component.html',
	styleUrls: ['./select-estado-proyecto.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useExisting: forwardRef(() => SelectEstadoProyectoComponent)
	}]
})
export class SelectEstadoProyectoComponent extends CommonSelect<string> implements AfterViewInit {

	@Input('mostrarInactivos') mostrarInactivos: boolean = false

	isLoading: boolean = true;
	estados: any[] = []
	error: string | null = null

	constructor(
		private _supabase: SupabaseService,
	) {
		super();
	}

	async ngAfterViewInit() {
		await this.obtenerEstados()
	}

	async obtenerEstados() {
		this.isLoading = true

		const query = this._supabase.client.from('estados_proyectos')
		.select(`
			id,
			color,
			descripcion,
			activo
		`)

		if (!this.mostrarInactivos)
			query.eq('activo', true)


		const { data, error } = await query.order('orden', { ascending: true })

		this.isLoading = false

		if (error) {
			this.error = error.message
			return
		}

		this.estados = data
	}

}
