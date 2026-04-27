<script setup lang="ts">
definePageMeta({ layout: false })

const config = useRuntimeConfig()
const API = config.public.apiBase
const { setAuth, isLoggedIn, isAdmin, init } = useAuth()
const { success, error: toastError } = useToast()
const router = useRouter()
const route = useRoute()

const form = reactive({ email: '', password: '' })
const loading = ref(false)
const showPassword = ref(false)
const rememberMe = ref(false)

onMounted(() => {
  init()
  if (isLoggedIn.value) {
    router.push(isAdmin.value ? '/admin' : '/')
  }
  const saved = localStorage.getItem('rememberedEmail')
  if (saved) {
    form.email = saved
    rememberMe.value = true
  }
})

const submit = async () => {
  if (!form.email || !form.password) {
    toastError('Please fill in all fields.')
    return
  }
  loading.value = true
  try {
    const res = await $fetch<{ token: string; user: { name: string; email: string; role: string } }>(`${API}/api/users/login`, {
      method: 'POST',
      body: { email: form.email, password: form.password }
    })
    if (rememberMe.value) {
      localStorage.setItem('rememberedEmail', form.email)
    } else {
      localStorage.removeItem('rememberedEmail')
    }
    setAuth(res.token, res.user)
    success('Logged in successfully!')
    const redirect = route.query.redirect as string;
    router.push(redirect || (res.user.role === 'admin' ? '/admin' : '/'))
  } catch (err: any) {
    toastError(err?.data?.message || err?.message || 'Login failed. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#020617] flex items-center justify-center px-4">
    <!-- Background glow -->
    <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-600/20 blur-[150px] rounded-full pointer-events-none" />

    <div class="relative w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/">
          <img src="/assets/images/SM3dPrints.png" alt="SM 3D Prints" class="h-16 w-auto mx-auto" />
        </NuxtLink>
        <h1 class="mt-4 text-2xl font-bold text-gray-100">Sign In</h1>
        <p class="text-sm text-gray-400 mt-1">Welcome back to SM3D Prints</p>
      </div>

      <div class="bg-[#0b1120] border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/40">
        <form @submit.prevent="submit" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full px-4 py-3 pr-12 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                tabindex="-1"
              >
                <!-- Eye open -->
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <!-- Eye closed -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 012.5-4.1M9.88 9.88a3 3 0 104.24 4.24M3 3l18 18" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <input
              id="rememberMe"
              v-model="rememberMe"
              type="checkbox"
              class="w-4 h-4 rounded border-gray-600 bg-gray-900 text-red-600 focus:ring-red-500 focus:ring-offset-0 cursor-pointer"
            />
            <label for="rememberMe" class="text-sm text-gray-400 cursor-pointer select-none">Remember me</label>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold shadow-lg shadow-red-600/30 transition duration-300"
          >
            {{ loading ? 'Signing in…' : 'Sign In' }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-500">
          Don't have an account?
          <NuxtLink to="/auth/register" class="text-red-400 hover:text-red-300 font-medium ml-1">Create one</NuxtLink>
        </p>
      </div>

      <p class="text-center mt-6 text-sm text-gray-600">
        <NuxtLink to="/" class="hover:text-gray-400 transition">← Back to site</NuxtLink>
      </p>
    </div>
  </div>
</template>
