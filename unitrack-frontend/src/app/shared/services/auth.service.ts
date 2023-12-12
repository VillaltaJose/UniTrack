import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthChangeEvent, AuthSession, Session, SupabaseClient, User } from '@supabase/supabase-js';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	client: SupabaseClient = this._supabase.client;
	_session: AuthSession | null = null;

	constructor(private _supabase: SupabaseService) {
		this.session;
	}

	get session() {
		this.client.auth.getSession().then(({ data }) => {
			this._session = data.session;
		});
		return this._session;
	}

	profile(user: User) {
		console.log(user.id)
		return this.client
			.from('perfiles')
			.select(`nombre, avatar_url`)
			.eq('id', user.id)
			.single();
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
