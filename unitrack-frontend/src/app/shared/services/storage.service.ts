import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class StorageService {

	constructor() {}

	setStorage(key: StorageKeys, value: any) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	getStorage(key: StorageKeys) {
		const storage = localStorage.getItem(key);

		if (!storage) return null

		return JSON.parse(storage);
	}

	clearStorage() {
		localStorage.clear()
	}

}

export enum StorageKeys {
	SESION = 'SESION',
	PERFIL = 'PERFIL',
	ID_DIRECTIVA = 'DIRECTIVA',
}
