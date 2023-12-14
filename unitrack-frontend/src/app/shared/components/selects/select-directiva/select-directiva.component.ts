import { AfterViewInit, Component, forwardRef, isDevMode } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SupabaseService } from 'src/app/shared/services/supabase.service';
import { CommonSelect } from '../common-select';
import { StorageKeys, StorageService } from 'src/app/shared/services/storage.service';

@Component({
	selector: 'app-select-directiva',
	templateUrl: './select-directiva.component.html',
	styleUrls: ['./select-directiva.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useExisting: forwardRef(() => SelectDirectivaComponent)
	}]
})
export class SelectDirectivaComponent extends CommonSelect<string> implements AfterViewInit {

	isLoading: boolean = true;
	directivas: any[] = []
	error: string | null = null

	constructor(
		private _supabase: SupabaseService,
		private _storage: StorageService,
	) {
		super();
	}

	async ngAfterViewInit() {
		await this.obtenerDirectivas()
	}

	async obtenerDirectivas() {
		this.isLoading = true

		const idDirectiva = <string>(this._storage.getStorage(StorageKeys.ID_DIRECTIVA))

		if (!idDirectiva) {
			this.error = 'La sesión no es válida'
			this.isLoading = false
			return
		}

		const { data, error } = await this._supabase.client.from('directivas')
		.select(`
			id,
			nombre
		`)
		.eq('activa', true)
		.eq('reporta_a', idDirectiva)

		this.isLoading = false

		if (error) {
			this.error = error.message
			return
		}

		this.directivas = data
	}

}
