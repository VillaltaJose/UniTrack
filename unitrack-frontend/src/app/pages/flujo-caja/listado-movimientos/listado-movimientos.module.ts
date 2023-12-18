import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoMovimientosComponent } from './listado-movimientos.component';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NuevoMovimientoModule } from '../nuevo-movimiento/nuevo-movimiento.module';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';

@NgModule({
	declarations: [ListadoMovimientosComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([{path: '', component: ListadoMovimientosComponent}]),
		NzTableModule,
		NzButtonModule,
		NzIconModule,
		NzInputModule,
		NzDatePickerModule,
		NzToolTipModule,
		NuevoMovimientoModule,
		NzDrawerModule,
	],
	providers: [
		NzDrawerService,
	]
})
export class ListadoMovimientosModule {}
