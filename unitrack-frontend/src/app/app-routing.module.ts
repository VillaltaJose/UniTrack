import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) },
	{ path: '', loadChildren: () => import('./shared/layouts/sidebar-layout/sidebar-layout.module').then(m => m.SidebarLayoutModule) },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
