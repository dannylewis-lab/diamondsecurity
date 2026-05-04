import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    'https://swqbxvvrubqmygrxabyz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3cWJ4dnZydWJxbXlncnhhYnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNjA1NDksImV4cCI6MjA5MjkzNjU0OX0.aW9WxXg7ZVxzZowOVYSsQcF4DUoxiWGNs6JhZs7nfug'
  )
}
