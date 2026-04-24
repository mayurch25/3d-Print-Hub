<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const config = useRuntimeConfig()
const API = config.public.apiBase
const { token } = useAuth()

const stats = reactive({ products: 0, messages: 0, newMessages: 0 })
const loading = ref(true)

onMounted(async () => {
  try {
    const headers = { Authorization: `Bearer ${token.value}` }
    const [products, messages] = await Promise.all([
      $fetch<any[]>(`${API}/api/products`, { headers }),
      $fetch<any[]>(`${API}/api/messages`, { headers })
    ])
    stats.products = products?.length ?? 0
    stats.messages = messages?.length ?? 0
    stats.newMessages = messages?.filter((m: any) => m.status === 'new').length ?? 0
  } catch {}
  loading.value = false
})
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-100">Dashboard</h1>
      <p class="text-gray-400 text-sm mt-1">Welcome back. Here's an overview of your store.</p>
    </div>

    <div v-if="loading" class="flex justify-center py-16">
      <div class="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else class="grid gap-6 sm:grid-cols-3">
      <!-- Products stat -->
      <div class="bg-[#0b1120] border border-white/10 rounded-2xl p-6 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <span class="text-gray-400 text-sm font-medium uppercase tracking-wide">Total Products</span>
          <span class="text-2xl">⬡</span>
        </div>
        <p class="text-4xl font-bold text-gray-100">{{ stats.products }}</p>
        <NuxtLink to="/admin/products" class="mt-4 inline-block text-sm text-red-400 hover:text-red-300 transition">
          Manage products →
        </NuxtLink>
      </div>

      <!-- Messages stat -->
      <div class="bg-[#0b1120] border border-white/10 rounded-2xl p-6 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <span class="text-gray-400 text-sm font-medium uppercase tracking-wide">Total Messages</span>
          <span class="text-2xl">✉</span>
        </div>
        <p class="text-4xl font-bold text-gray-100">{{ stats.messages }}</p>
        <NuxtLink to="/admin/messages" class="mt-4 inline-block text-sm text-red-400 hover:text-red-300 transition">
          View messages →
        </NuxtLink>
      </div>

      <!-- New messages stat -->
      <div class="bg-[#0b1120] border rounded-2xl p-6 shadow-xl"
        :class="stats.newMessages > 0 ? 'border-red-500/40 shadow-red-500/10' : 'border-white/10'">
        <div class="flex items-center justify-between mb-4">
          <span class="text-gray-400 text-sm font-medium uppercase tracking-wide">New Messages</span>
          <span class="text-2xl">🔔</span>
        </div>
        <p class="text-4xl font-bold" :class="stats.newMessages > 0 ? 'text-red-400' : 'text-gray-100'">
          {{ stats.newMessages }}
        </p>
        <NuxtLink to="/admin/messages" class="mt-4 inline-block text-sm text-red-400 hover:text-red-300 transition">
          Review inbox →
        </NuxtLink>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="mt-10">
      <h2 class="text-lg font-semibold text-gray-200 mb-4">Quick Actions</h2>
      <div class="flex flex-wrap gap-4">
        <NuxtLink
          to="/admin/products/new"
          class="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg shadow-red-600/30 transition"
        >
          + Add New Product
        </NuxtLink>
        <NuxtLink
          to="/admin/messages"
          class="px-6 py-3 rounded-xl bg-[#0b1120] hover:bg-gray-800 border border-white/10 text-gray-300 hover:text-gray-100 font-medium transition"
        >
          View Messages
        </NuxtLink>
        <NuxtLink
          to="/"
          target="_blank"
          class="px-6 py-3 rounded-xl bg-[#0b1120] hover:bg-gray-800 border border-white/10 text-gray-300 hover:text-gray-100 font-medium transition"
        >
          View Site ↗
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
