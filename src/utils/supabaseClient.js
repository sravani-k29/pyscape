import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-key';

// Create a client even with placeholder values, but it won't be functional
// The auth context will handle this gracefully
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Log a warning if using placeholder values
if (!process.env.REACT_APP_SUPABASE_URL || !process.env.REACT_APP_SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase credentials not found in environment variables. ' +
    'The application will run in demo mode without backend functionality.'
  );
}
