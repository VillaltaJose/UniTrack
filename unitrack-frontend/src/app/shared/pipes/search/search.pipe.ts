import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'search'
})
export class SearchPipe implements PipeTransform {

	transform(items: any[], searchText: string, field: string): any[] {
		if (!items) {
			return [];
		}
		if (!searchText) {
			return items;
		}
		searchText = searchText.toLocaleLowerCase();

		return items.filter(it => {
			return it[field].toLocaleLowerCase().includes(searchText);
		});
	}

}
