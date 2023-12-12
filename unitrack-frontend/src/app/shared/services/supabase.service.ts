import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class SupabaseService {

	client: SupabaseClient

	constructor() {
		this.client = createClient(environment.supabaseUrl, environment.supabaseKey)
	}
}
