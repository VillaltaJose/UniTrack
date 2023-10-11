import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss']
})
export class SidebarLayoutComponent {

	isSidebarOpen: boolean = true

	constructor() {
		this.isSidebarOpen = localStorage.getItem('isSidebarOpen') === 'true'
	}

	changeStorageMenuState(state: boolean) {
		localStorage.setItem('isSidebarOpen', `${state}`)
		this.isSidebarOpen = state
	}

}
