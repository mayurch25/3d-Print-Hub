<script setup lang="ts">
definePageMeta({ layout: false })

const config = useRuntimeConfig()
const API = config.public.apiBase
const { setAuth, isLoggedIn, isAdmin, init } = useAuth()
const router = useRouter()
const route = useRoute()

const form = reactive({ email: '', password: '' })
const error = ref('')
const loading = ref(false)

onMounted(() => {
  init()
  if (isLoggedIn.value) {
    router.push(isAdmin.value ? '/admin' : '/')
  }
})

const submit = async () => {
  error.value = ''
  if (!form.email || !form.password) {
    error.value = 'Please fill in all fields.'
    return
  }
  loading.value = true
  try {
    const res = await $fetch<{ token: string; user: { name: string; email: string; role: string } }>(`${API}/api/users/login`, {
      method: 'POST',
      body: { email: form.email, password: form.password }
    })
    setAuth(res.token, res.user)
    const redirect = route.query.redirect as string;
    router.push(redirect || (res.user.role === 'admin' ? '/admin' : '/'))
  } catch (err: any) {
    error.value = err?.data?.message || err?.message || 'Login failed. Please try again.'
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
            <input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
            />
          </div>

          <div v-if="error" class="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
            {{ error }}
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
