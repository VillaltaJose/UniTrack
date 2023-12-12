import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCuentasComponent } from './listado-cuentas.component';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NuevaCuentaModule } from '../nueva-cuenta/nueva-cuenta.module';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';

@NgModule({
	declarations: [ListadoCuentasComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: ListadoCuentasComponent },
		]),
		NzTableModule,
		NzButtonModule,
		NzIconModule,
		NzDrawerModule,
		NuevaCuentaModule,
	],
})
export class ListadoCuentasModule {}
