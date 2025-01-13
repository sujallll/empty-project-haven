import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Get environment variables
const supabaseUrl = 'https://fkthvcaehstlbkgztspt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrdGh2Y2FlaHN0bGJrZ3p0c3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MTQ5MDIsImV4cCI6MjA1MjI5MDkwMn0.zGH_oafA9YceNZSeReblH98OUyS28TG7r537ycgkZnY';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Clean and validate URL format
const cleanUrl = supabaseUrl.trim().replace(/\/$/, '');
if (!cleanUrl.startsWith('https://')) {
  throw new Error('Invalid Supabase URL format');
}

export const supabase = createClient<Database>(
  cleanUrl,
  supabaseAnonKey.trim(),
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    },
    global: {
      headers: {
        'x-my-custom-header': 'my-app-name',
      },
    },
    db: {
      schema: 'public'
    },
    realtime: {
      params: {
        eventsPerSecond: 2
      }
    }
  }
);

// Handle auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  } else if (event === 'SIGNED_IN') {
    console.log('User signed in:', session?.user?.id);
  } else if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed successfully');
  } else if (event === 'USER_UPDATED') {
    console.log('User updated:', session?.user?.id);
  }
});

// Handle token refresh errors
supabase.auth.onAuthStateChange(async (event) => {
  if (event === 'TOKEN_REFRESHED') {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) {
      console.error('Token refresh failed:', error);
      await supabase.auth.signOut();
      window.location.href = '/login';
    }
  }
});