import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoMovimientoComponent } from './nuevo-movimiento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { SelectCuentaFinancieraModule } from 'src/app/shared/components/selects/select-cuenta-financiera/select-cuenta-financiera.module';
import { SelectProyectoModule } from 'src/app/shared/components/selects/select-proyecto/select-proyecto.module';

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
		SelectCuentaFinancieraModule,
		SelectProyectoModule,
	],
})
export class NuevoMovimientoModule {}
