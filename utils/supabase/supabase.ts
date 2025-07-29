import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabasetype'

let supabase: SupabaseClient<Database> | null = null

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (supabaseUrl && supabaseKey) {
  supabase = createClient<Database>(supabaseUrl, supabaseKey)
}

export { supabase }