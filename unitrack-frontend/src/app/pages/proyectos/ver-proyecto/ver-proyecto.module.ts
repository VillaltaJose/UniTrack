import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerProyectoComponent } from './ver-proyecto.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { SelectEstadoProyectoModule } from 'src/app/shared/components/selects/select-estado-proyecto/select-estado-proyecto.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [VerProyectoComponent],
	exports: [VerProyectoComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NzInputModule,
		NzButtonModule,
		NzDrawerModule,
		NzTagModule,
		NzTimelineModule,
		NzIconModule,
		NzToolTipModule,
		NzSpinModule,
		SelectEstadoProyectoModule,
	],
})
export class VerProyectoModule {}
