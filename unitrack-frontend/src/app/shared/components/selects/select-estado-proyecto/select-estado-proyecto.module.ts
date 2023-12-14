import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectEstadoProyectoComponent } from './select-estado-proyecto.component';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
	declarations: [SelectEstadoProyectoComponent],
	exports: [SelectEstadoProyectoComponent],
	imports: [CommonModule, FormsModule, NzSelectModule],
})
export class SelectEstadoProyectoModule {}
