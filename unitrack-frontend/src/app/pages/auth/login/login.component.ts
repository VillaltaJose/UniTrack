import { Component, isDevMode } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

	form: FormGroup;
	isDevMode = isDevMode();

	constructor() {
		this.form = new FormGroup({
			correo: new FormControl('', [Validators.required, Validators.email]),
			clave: new FormControl('', [Validators.required, Validators.minLength(8)]),
		});
	}

	iniciarSesion() {
		console.log(this.form.value);
	}

}
