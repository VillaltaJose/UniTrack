import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarLayoutComponent } from './sidebar-layout.component';
import { Route, RouterModule } from '@angular/router';
import { SidebarModule } from '../../components/ui/sidebar/sidebar.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

const routes: Route[] = [
	{
		path: '',
		component: SidebarLayoutComponent,
		children: [
			{
				path: 'cuentas',
				loadChildren: () =>
					import(
						'src/app/pages/cuentas/listado-cuentas/listado-cuentas.module'
					).then((m) => m.ListadoCuentasModule),
			},
			{
				path: 'movimientos',
				loadChildren: () =>
					import(
						'src/app/pages/flujo-caja/listado-movimientos/listado-movimientos.module'
					).then((m) => m.ListadoMovimientosModule),
			},
			{
				path: 'proyectos',
				loadChildren: () =>
					import(
						'src/app/pages/proyectos/listado-proyectos/listado-proyectos.module'
					).then((m) => m.ListadoProyectosModule),
			},
		],
	},
];

@NgModule({
	declarations: [SidebarLayoutComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SidebarModule,
		NzIconModule,
		NzButtonModule,
	],
})
export class SidebarLayoutModule {}
