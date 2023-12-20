import { AfterViewInit, Component, forwardRef } from '@angular/core';
import { CommonSelect } from '../common-select';
import { SupabaseService } from 'src/app/shared/services/supabase.service';
import { CuentasService } from 'src/app/shared/services/cuentas.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-select-cuenta-financiera',
	templateUrl: './select-cuenta-financiera.component.html',
	styleUrls: ['./select-cuenta-financiera.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useExisting: forwardRef(() => SelectCuentaFinancieraComponent)
	}]
})
export class SelectCuentaFinancieraComponent extends CommonSelect<string> implements AfterViewInit {

	isLoading: boolean = true;
	cuentas: any[] = [];
	error: string | null = null;

	constructor(private _cuentaService: CuentasService) {
		super();
	}

	async ngAfterViewInit() {
		await this.obtenerCuentas();
	}

	async obtenerCuentas(alias: string | null = null) {
		this.isLoading = true;

		const { data, error } = await this._cuentaService.obtenerCuentasSelect({
			alias,
		});

		this.isLoading = false;

		if (error) {
			this.error = error.message;
			return;
		}

		this.cuentas = data;
	}
}
