import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_DEV as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
