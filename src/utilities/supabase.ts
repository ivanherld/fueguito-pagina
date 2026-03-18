import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? '').trim();
const supabaseKey = (
	import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
	import.meta.env.VITE_SUPABASE_ANON_KEY ??
	''
).trim();

let supabaseClient: SupabaseClient | null = null;

export function hasSupabaseEnv(): boolean {
	return Boolean(supabaseUrl && supabaseKey);
}

export function getSupabaseClient(): SupabaseClient {
	if (!hasSupabaseEnv()) {
		throw new Error(
			'Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY (o VITE_SUPABASE_ANON_KEY).',
		);
	}

	if (!supabaseClient) {
		supabaseClient = createClient(supabaseUrl, supabaseKey);
	}

	return supabaseClient;
}
