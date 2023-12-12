import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoProyectosComponent } from './listado-proyectos.component';

const routes: Routes = [
	{ path: '', component: ListadoProyectosComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ListadoProyectosRoutingModule {}
