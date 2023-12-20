import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakPipe } from './break.pipe';

@NgModule({
	declarations: [BreakPipe],
	exports: [BreakPipe],
	imports: [CommonModule],
})
export class BreakPipeModule {}
