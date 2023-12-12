import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoProyectosRoutingModule } from './listado-proyectos-routing.module';
import { ListadoProyectosComponent } from './listado-proyectos.component';

@NgModule({
	declarations: [ListadoProyectosComponent],
	imports: [CommonModule, ListadoProyectosRoutingModule],
})
export class ListadoProyectosModule {}
