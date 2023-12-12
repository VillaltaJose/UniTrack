import { Component, isDevMode } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

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

	constructor(
		private _auth: AuthService,
		private _router: Router,
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

		this._router.navigate(['/inicio']);
	}

}
