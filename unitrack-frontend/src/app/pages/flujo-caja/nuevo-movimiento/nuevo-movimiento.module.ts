import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoMovimientoComponent } from './nuevo-movimiento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@NgModule({
	declarations: [NuevoMovimientoComponent],
	exports: [NuevoMovimientoComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NzInputModule,
		NzSelectModule,
		NzButtonModule,
		NzInputNumberModule,
	],
})
export class NuevoMovimientoModule {}
