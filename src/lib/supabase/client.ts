import { createBrowserClient } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://swqbxvvrubqmygrxabyz.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3cWJ4dnZydWJxbXlncnhhYnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNjA1NDksImV4cCI6MjA5MjkzNjU0OX0.aW9WxXg7ZVxzZowOVYSsQcF4DUoxiWGNs6JhZs7nfug'

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
