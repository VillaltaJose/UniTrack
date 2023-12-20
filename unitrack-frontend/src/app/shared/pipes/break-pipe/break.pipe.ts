import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'break',
})
export class BreakPipe implements PipeTransform {
	transform(value: string, ...args: any[]) {
		return value.replace(/(?:\r\n|\r|\n)/g, '<br/>');
	}
}
