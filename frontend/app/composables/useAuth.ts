export const useAuth = () => {
  const token = useState<string | null>('auth_token', () => null)
  const user = useState<{ id: string; name: string; email: string; role: string } | null>('auth_user', () => null)

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const init = () => {
    if (!process.client) return
    const t = localStorage.getItem('auth_token')
    const u = localStorage.getItem('auth_user')
    if (t) token.value = t
    if (u) {
      try { user.value = JSON.parse(u) } catch {}
    }
  }

  const setAuth = (newToken: string, newUser: any) => {
    token.value = newToken
    user.value = newUser
    if (process.client) {
      localStorage.setItem('auth_token', newToken)
      localStorage.setItem('auth_user', JSON.stringify(newUser))
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    if (process.client) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
  }

  return { token, user, isLoggedIn, isAdmin, setAuth, logout, init }
}
