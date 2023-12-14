import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDirectivaComponent } from './select-directiva.component';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
	declarations: [SelectDirectivaComponent],
	exports: [SelectDirectivaComponent],
	imports: [CommonModule, FormsModule, NzSelectModule],
})
export class SelectDirectivaModule {}
