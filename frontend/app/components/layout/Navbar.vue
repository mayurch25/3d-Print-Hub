<script setup>
const { isLoggedIn, isAdmin, user, logout, init } = useAuth()
const router = useRouter()

onMounted(() => init())

const doLogout = () => {
  logout()
  router.push('/')
}
</script>

<template>
  <nav class="relative bg-[#0b1120] border-b border-white/10 shadow-2xl">
    <div class="absolute inset-0 bg-gradient-radial from-[#1e293b]/40 via-transparent to-transparent opacity-70" />

    <div class="relative max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center justify-center sm:justify-start">
        <img src="/assets/images/SM3dPrints.png" alt="SM 3D Print Hub" class="h-16 md:h-20 w-auto object-contain" />
      </NuxtLink>

      <!-- Nav links -->
      <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-medium tracking-wide text-sm sm:text-base">
        <NuxtLink to="/" class="text-gray-300 hover:text-red-500 transition duration-300">Home</NuxtLink>
        <NuxtLink to="/products" class="text-gray-300 hover:text-red-500 transition duration-300">Products</NuxtLink>
        <NuxtLink to="/contacts" class="text-gray-300 hover:text-red-500 transition duration-300">Contacts</NuxtLink>
        <NuxtLink to="/about" class="text-gray-300 hover:text-red-500 transition duration-300">About Us</NuxtLink>

        <!-- Admin link (admin only) -->
        <NuxtLink
          v-if="isAdmin"
          to="/admin"
          class="text-gray-300 hover:text-red-500 transition duration-300"
        >Admin</NuxtLink>

        <!-- Auth buttons -->
        <template v-if="isLoggedIn">
          <span class="text-gray-500 text-sm hidden sm:inline">{{ user?.name?.split(' ')[0] }}</span>
          <button
            @click="doLogout"
            class="bg-gray-800 hover:bg-gray-700 text-gray-200 px-5 py-2 rounded-xl border border-white/10 shadow-lg transition duration-300 text-sm"
          >Logout</button>
        </template>
        <template v-else>
          <NuxtLink
            to="/auth/login"
            class="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl shadow-lg shadow-red-600/30 transition duration-300 text-sm"
          >Login</NuxtLink>
        </template>
      </div>
    </div>
  </nav>
</template>
