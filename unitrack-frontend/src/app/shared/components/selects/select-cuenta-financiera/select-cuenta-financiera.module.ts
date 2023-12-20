import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCuentaFinancieraComponent } from './select-cuenta-financiera.component';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
	declarations: [SelectCuentaFinancieraComponent],
	exports: [SelectCuentaFinancieraComponent],
	imports: [CommonModule, FormsModule, NzSelectModule],
})
export class SelectCuentaFinancieraModule {}
