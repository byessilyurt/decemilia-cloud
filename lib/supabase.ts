import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
  }
  return url;
}

function getSupabaseAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  return key;
}

export function createServerClient() {
  return createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: {
      persistSession: false,
    },
  });
}

export function createBrowserClient() {
  return createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey());
}

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null;

export const supabase = new Proxy({} as ReturnType<typeof createBrowserClient>, {
  get(target, prop) {
    if (!supabaseInstance) {
      supabaseInstance = createBrowserClient();
    }
    return (supabaseInstance as any)[prop];
  }
});