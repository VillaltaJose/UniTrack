import { Component, OnInit } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { StorageKeys, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss']
})
export class SidebarLayoutComponent implements OnInit {

	isSidebarOpen: boolean = true
	session: Session | null = null
	usuario: any | null = null

	constructor(
		private _storage: StorageService,
	) {
		this.isSidebarOpen = localStorage.getItem('isSidebarOpen') === 'true'
	}

	ngOnInit() {
		this.obtenerSesion()
	}

	changeStorageMenuState(state: boolean) {
		localStorage.setItem('isSidebarOpen', `${state}`)
		this.isSidebarOpen = state
	}

	obtenerSesion() {
		this.session = this._storage.getStorage(StorageKeys.SESION)

		if (!this.session) return

		this.usuario = this._storage.getStorage(StorageKeys.PERFIL)
	}

}
