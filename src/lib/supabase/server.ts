import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    'https://swqbxvvrubqmygrxabyz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3cWJ4dnZydWJxbXlncnhhYnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNjA1NDksImV4cCI6MjA5MjkzNjU0OX0.aW9WxXg7ZVxzZowOVYSsQcF4DUoxiWGNs6JhZs7nfug',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from Server Component — middleware handles session refresh
          }
        },
      },
    }
  )
}
