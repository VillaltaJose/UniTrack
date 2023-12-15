import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectEstadoProyectoComponent } from './select-estado-proyecto.component';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';

@NgModule({
	declarations: [SelectEstadoProyectoComponent],
	exports: [SelectEstadoProyectoComponent],
	imports: [CommonModule, FormsModule, NzSelectModule, NzTagModule,],
})
export class SelectEstadoProyectoModule {}
