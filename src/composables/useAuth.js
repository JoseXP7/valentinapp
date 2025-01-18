import { useRouter } from 'vue-router'
import { useSupabase } from '@/clients/supabase'
import { useUser } from './useUser'

export function useAuth() {
  const { supabase } = useSupabase()
  const { setUser } = useUser()
  const router = useRouter()

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()

    if (error) throw error

    if (data.session && data.session.user) {
      setUser(data.session.user)
    }
    return data.session
  }

  const signUpWithPassw = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error

    setUser(data.user)
    router.push('/')
  }

  const loginWithPassw = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error

    setUser(data.user)
    router.push('/')
  }

  const getUserRole = async () => {
    const session = await getSession()
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
    if (error) throw error
    return data.role
  }

  return {
    getSession,
    signUpWithPassw,
    loginWithPassw,
    getUserRole,
  }
}
