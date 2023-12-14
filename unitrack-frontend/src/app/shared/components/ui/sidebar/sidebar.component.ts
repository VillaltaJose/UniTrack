import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageKeys, StorageService } from 'src/app/shared/services/storage.service';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

	@Input('opened') opened: boolean = false;
	@Output('openedChange') openedOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

	directiva: any = null
	loading = true

	constructor(
		private _supabase: SupabaseService,
		private _storage: StorageService,
		private _auth: AuthService,
		private _router: Router,
	) {}

	async ngOnInit() {
		await this.obtenerDirectiva()
	}

	async obtenerDirectiva() {
		this.loading = true

		const { data} = await this._supabase.client.from('directivas')
			.select(`id,nombre,avatar_url`)
			.eq(`id`, this._storage.getStorage(StorageKeys.ID_DIRECTIVA))
			.single()

		this.directiva = data
		this.loading = false
	}

	async cerrarSesion() {
		this._storage.clearStorage()
		await this._auth.signOut()
		this._router.navigateByUrl('/login')
	}

}
