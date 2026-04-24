<script setup lang="ts">
const { user, isLoggedIn, isAdmin, logout, init } = useAuth()
const router = useRouter()
const sidebarOpen = ref(false)

onMounted(() => {
  init()
  if (!isLoggedIn.value || !isAdmin.value) {
    router.push('/auth/login')
  }
})

const doLogout = () => {
  logout()
  router.push('/auth/login')
}


</script>

<template>
  <div class="flex h-screen bg-[#020617] overflow-hidden">
    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/60 z-20 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#0b1120] border-r border-white/10 flex flex-col transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Logo -->
      <div class="px-6 py-5 border-b border-white/10">
        <NuxtLink to="/" class="flex items-center gap-2">
          <img src="/assets/images/SM3dPrints.png" alt="SM 3D Prints" class="h-10 w-auto" />
          <span class="text-xs font-semibold text-red-400 uppercase tracking-widest">Admin</span>
        </NuxtLink>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-4 py-6 space-y-1">
        <!-- Dashboard -->
        <NuxtLink
          to="/admin"
          exact-active-class="bg-red-600/20 text-red-400 border-red-500/40"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-600/10 border border-transparent transition duration-200 text-sm font-medium"
          @click="sidebarOpen = false"
        >
          <span class="text-base">▦</span> Dashboard
        </NuxtLink>

        <!-- Products section -->
        <div class="pt-3 pb-1 px-4">
          <p class="text-xs font-semibold text-gray-600 uppercase tracking-widest">Products</p>
        </div>
        <NuxtLink
          to="/admin/products"
          exact-active-class="bg-red-600/20 text-red-400 border-red-500/40"
          class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-600/10 border border-transparent transition duration-200 text-sm font-medium"
          @click="sidebarOpen = false"
        >
          <span class="text-base">⬡</span> All Products
        </NuxtLink>
        <NuxtLink
          to="/admin/products/new"
          active-class="bg-red-600/20 text-red-400 border-red-500/40"
          class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-600/10 border border-transparent transition duration-200 text-sm font-medium"
          @click="sidebarOpen = false"
        >
          <span class="text-lg leading-none">+</span> Add Product
        </NuxtLink>

        <!-- Messages section -->
        <div class="pt-3 pb-1 px-4">
          <p class="text-xs font-semibold text-gray-600 uppercase tracking-widest">Enquiries</p>
        </div>
        <NuxtLink
          to="/admin/messages"
          active-class="bg-red-600/20 text-red-400 border-red-500/40"
          class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-600/10 border border-transparent transition duration-200 text-sm font-medium"
          @click="sidebarOpen = false"
        >
          <span class="text-base">✉</span> Messages
        </NuxtLink>
      </nav>

      <!-- User + Logout -->
      <div class="px-4 py-4 border-t border-white/10">
        <div class="px-4 py-2 mb-3">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Signed in as</p>
          <p class="text-sm text-gray-200 font-medium truncate">{{ user?.name || user?.email }}</p>
        </div>
        <button
          @click="doLogout"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-600/10 border border-transparent transition duration-200 text-sm font-medium"
        >
          <span>↩</span> Logout
        </button>
      </div>
    </aside>

    <!-- Main -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top bar (mobile) -->
      <header class="lg:hidden flex items-center gap-4 px-4 py-3 bg-[#0b1120] border-b border-white/10">
        <button @click="sidebarOpen = true" class="text-gray-400 hover:text-red-400 text-xl">☰</button>
        <span class="text-gray-200 font-semibold text-sm">SM3D Admin</span>
      </header>

      <!-- Content -->
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
