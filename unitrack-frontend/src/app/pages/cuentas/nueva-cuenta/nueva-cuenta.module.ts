import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaCuentaComponent } from './nueva-cuenta.component';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [NuevaCuentaComponent],
	exports: [NuevaCuentaComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NzDrawerModule,
		NzSelectModule,
		NzInputModule,
		NzButtonModule,
	],
	providers: [NzDrawerService]
})
export class NuevaCuentaModule {}
