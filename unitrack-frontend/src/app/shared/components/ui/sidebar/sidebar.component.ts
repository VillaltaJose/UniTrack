import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {

	@Input('opened') opened: boolean = false;
	@Output('openedChange') openedOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor() {}

}
