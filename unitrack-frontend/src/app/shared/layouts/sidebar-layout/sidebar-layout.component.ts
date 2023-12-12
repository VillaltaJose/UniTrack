import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss']
})
export class SidebarLayoutComponent implements OnInit {

	isSidebarOpen: boolean = true
	session: Session | null = null
	perfil: any | null = null

	constructor(
		private _auth: AuthService,
	) {
		this.isSidebarOpen = localStorage.getItem('isSidebarOpen') === 'true'
	}

	async ngOnInit() {
		await this.obtenerSesion()
	}

	changeStorageMenuState(state: boolean) {
		localStorage.setItem('isSidebarOpen', `${state}`)
		this.isSidebarOpen = state
	}

	async obtenerSesion() {
		this.session = this._auth.session

		if (!this.session) return

		const { data, error } = await this._auth.profile(this.session.user)

		if (error) return

		this.perfil = data
	}

}
