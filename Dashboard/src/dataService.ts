// dataService.ts
import { supabase } from './supabaseClient'

export async function fetchTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')

  if (error) {
    console.error('Error fetching tasks:', error)
    return []
  }
  return data
}
