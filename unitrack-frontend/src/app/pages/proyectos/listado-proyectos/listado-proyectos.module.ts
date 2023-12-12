import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoProyectosRoutingModule } from './listado-proyectos-routing.module';
import { ListadoProyectosComponent } from './listado-proyectos.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { VerProyectoModule } from '../ver-proyecto/ver-proyecto.module';

@NgModule({
	declarations: [ListadoProyectosComponent],
	imports: [
		CommonModule,
		ListadoProyectosRoutingModule,
		NzButtonModule,
		NzInputModule,
		NzTableModule,
		NzIconModule,
		NzToolTipModule,
		NzDatePickerModule,
		NzDrawerModule,
		VerProyectoModule,
	],
	providers: [
		NzDrawerService,
	]
})
export class ListadoProyectosModule {}
