// src/composables/useAuth.js
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabaseClient'

// Estado GLOBAL compartido (fuera del composable)
const _user = ref(null)
const _session = ref(null)

export function useAuth() {
  const isAuthenticated = computed(() => !!_session.value)

  const user = computed(() => _user.value)

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error;
    _user.value = data.user
    _session.value = data.session
    return data
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error;
    _user.value = null
    _session.value = null
    
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
  }
}
