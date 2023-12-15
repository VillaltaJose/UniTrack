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
import { SelectEstadoProyectoModule } from 'src/app/shared/components/selects/select-estado-proyecto/select-estado-proyecto.module';
import { SelectDirectivaModule } from 'src/app/shared/components/selects/select-directiva/select-directiva.module';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [ListadoProyectosComponent],
	imports: [
		CommonModule,
		ListadoProyectosRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NzButtonModule,
		NzInputModule,
		NzTableModule,
		NzIconModule,
		NzToolTipModule,
		NzDatePickerModule,
		NzDrawerModule,
		NzTagModule,
		VerProyectoModule,
		SelectEstadoProyectoModule,
		SelectDirectivaModule,
	],
	providers: [
		NzDrawerService,
	]
})
export class ListadoProyectosModule {}
