import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-nueva-cuenta',
	templateUrl: './nueva-cuenta.component.html',
	styleUrls: ['./nueva-cuenta.component.scss'],
})
export class NuevaCuentaComponent {

	form: FormGroup

	constructor() {
		this.form = new FormGroup({})
	}

}
