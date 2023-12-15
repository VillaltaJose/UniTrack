import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoProyectoComponent } from './nuevo-proyecto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@NgModule({
	declarations: [NuevoProyectoComponent],
	exports: [NuevoProyectoComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NzInputModule,
		NzButtonModule,
		NzSelectModule,
		NzDatePickerModule,
		NzDrawerModule,
	],
})
export class NuevoProyectoModule {}
