import { Component, isDevMode } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Session, User } from '@supabase/supabase-js';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageKeys, StorageService } from 'src/app/shared/services/storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

	error: string | null = null;
	loading: boolean = false;
	form: FormGroup;
	isDevMode = isDevMode();

	directivas: any[] = []

	constructor(
		private _auth: AuthService,
		private _router: Router,
		private _storage: StorageService,
	) {
		this.form = new FormGroup({
			correo: new FormControl('', [Validators.required, Validators.email]),
			clave: new FormControl('', [Validators.required]),
		});
	}

	async iniciarSesion() {
		this.error = null

		if (this.form.invalid) {
			this.error = 'Los campos marcados son obligatorios'
			this.form.markAllAsTouched()
			return
		}

		this.loading = true

		const { data, error } = await this._auth.signIn(this.form.value.correo, this.form.value.clave);

		this.loading = false
		if (error) {
			this.error = error.message
			return
		}

		this.colocarSesionStorage(data)

		await this.obtenerDirectivas()
	}

	async obtenerDirectivas() {
		const { data, error } = await this._auth.client
			.from('perfiles_directivas_roles')
			.select(`
				id_directiva,
				directiva:directivas(
					nombre,
					avatar_url
				)
			`);

		if (error) {
			alert(error.message)
			return
		}

		if (data.length == 1) {
			this.seleccionarDirectiva(data[0].id_directiva)
		}

		this.directivas = data
	}

	seleccionarDirectiva(id: string) {
		this._storage.setStorage(StorageKeys.ID_DIRECTIVA, id)
		this._router.navigate(['/inicio']);
	}

	async colocarSesionStorage(info: {user: User, session: Session}) {
		this._storage.setStorage(StorageKeys.SESION, info.session)

		const perfil = {...info.user, perfil: {}}


		const { data, error } = await this._auth.client
			.from('perfiles')
			.select(`nombre, avatar_url`)
			.eq('id', info.user.id)
			.single()

		if (error) {
			this._storage.setStorage(StorageKeys.PERFIL, info.user)
			return
		}

		perfil.perfil = data
		this._storage.setStorage(StorageKeys.PERFIL, perfil)
	}

}
