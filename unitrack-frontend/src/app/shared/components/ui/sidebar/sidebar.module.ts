import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [SidebarComponent],
	exports: [SidebarComponent],
	imports: [
		CommonModule,
		NzIconModule,
		RouterModule,
		NzToolTipModule,
	],
})
export class SidebarModule {}
