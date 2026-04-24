export default defineNuxtRouteMiddleware(() => {
  if (process.server) return
  const { isLoggedIn, isAdmin } = useAuth()
  if (!isLoggedIn.value || !isAdmin.value) {
    return navigateTo('/auth/login')
  }
})
