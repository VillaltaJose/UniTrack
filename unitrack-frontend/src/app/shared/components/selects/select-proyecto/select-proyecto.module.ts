import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectProyectoComponent } from './select-proyecto.component';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
	declarations: [SelectProyectoComponent],
	exports: [SelectProyectoComponent],
	imports: [CommonModule, FormsModule, NzSelectModule],
})
export class SelectProyectoModule {}
