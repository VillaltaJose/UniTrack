import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthChangeEvent, AuthSession, Session, SupabaseClient, User } from '@supabase/supabase-js';
import { StorageKeys, StorageService } from './storage.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	client: SupabaseClient = this._supabase.client;
	_session: AuthSession | null = null;

	constructor(
		private _supabase: SupabaseService,
		private _storage: StorageService,
	) {
		this.session;
	}

	get session() {
		this.client.auth.getSession().then(({ data }) => {
			this._session = data.session;
			this._storage.setStorage(StorageKeys.SESION, this._session);
		});
		return this._session;
	}

	profile() {
		return this._storage.getStorage(StorageKeys.PERFIL);
	}

	authChanges(
		callback: (event: AuthChangeEvent, session: Session | null) => void
	) {
		return this.client.auth.onAuthStateChange(callback);
	}

	signIn(email: string, password: string) {
		return this.client.auth.signInWithPassword({email, password});
	}

	signOut() {
		return this.client.auth.signOut();
	}

	updateProfile(profile: any) {
		const update = {
			...profile,
			updated_at: new Date(),
		};

		return this.client.from('profiles').upsert(update);
	}

	downLoadImage(path: string) {
		return this.client.storage.from('avatars').download(path);
	}

	uploadAvatar(filePath: string, file: File) {
		return this.client.storage.from('avatars').upload(filePath, file);
	}
}
