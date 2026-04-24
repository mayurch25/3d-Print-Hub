<script setup>
const { isLoggedIn, isAdmin, user, logout, init } = useAuth()
const router = useRouter()
const mobileOpen = ref(false)

onMounted(() => init())

const doLogout = () => {
  logout()
  mobileOpen.value = false
  router.push('/')
}

const closeMenu = () => {
  mobileOpen.value = false
}
</script>

<template>
  <nav class="relative bg-[#0b1120] border-b border-white/10 shadow-2xl z-40">
    <div class="absolute inset-0 bg-gradient-radial from-[#1e293b]/40 via-transparent to-transparent opacity-70" />

    <div class="relative max-w-7xl mx-auto px-6 py-4">
      <!-- Top bar -->
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" @click="closeMenu">
          <img src="/assets/images/SM3dPrints.png" alt="SM 3D Print Hub" class="h-16 md:h-20 w-auto object-contain" />
        </NuxtLink>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-6 lg:gap-8 font-medium tracking-wide text-sm lg:text-base">
          <NuxtLink to="/" class="text-gray-300 hover:text-red-500 transition duration-300">Home</NuxtLink>
          <NuxtLink to="/products" class="text-gray-300 hover:text-red-500 transition duration-300">Products</NuxtLink>
          <NuxtLink to="/contacts" class="text-gray-300 hover:text-red-500 transition duration-300">Contacts</NuxtLink>
          <NuxtLink to="/about" class="text-gray-300 hover:text-red-500 transition duration-300">About Us</NuxtLink>

          <!-- Inquiry (logged-in non-admin only) -->
          <NuxtLink
            v-if="isLoggedIn && !isAdmin"
            to="/inquiry"
            class="text-gray-300 hover:text-red-500 transition duration-300"
          >Inquiry</NuxtLink>

          <!-- Admin link -->
          <NuxtLink
            v-if="isAdmin"
            to="/admin"
            class="text-gray-300 hover:text-red-500 transition duration-300"
          >Admin</NuxtLink>

          <!-- Auth -->
          <template v-if="isLoggedIn">
            <span class="text-gray-500 text-sm">{{ user?.name?.split(' ')[0] }}</span>
            <button
              @click="doLogout"
              class="bg-gray-800 hover:bg-gray-700 text-gray-200 px-5 py-2 rounded-xl border border-white/10 shadow-lg transition duration-300 text-sm"
            >Logout</button>
          </template>
          <template v-else>
            <NuxtLink
              to="/auth/register"
              class="bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white px-5 py-2 rounded-xl border border-white/20 transition duration-300 text-sm"
            >Register</NuxtLink>
            <NuxtLink
              to="/auth/login"
              class="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl shadow-lg shadow-red-600/30 transition duration-300 text-sm"
            >Login</NuxtLink>
          </template>
        </div>

        <!-- Hamburger (mobile) -->
        <button
          class="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-white/5 transition"
          @click="mobileOpen = !mobileOpen"
          aria-label="Toggle menu"
        >
          <span
            class="block h-0.5 w-6 bg-gray-300 transition-all duration-300"
            :class="mobileOpen ? 'rotate-45 translate-y-2' : ''"
          ></span>
          <span
            class="block h-0.5 w-6 bg-gray-300 transition-all duration-300"
            :class="mobileOpen ? 'opacity-0' : ''"
          ></span>
          <span
            class="block h-0.5 w-6 bg-gray-300 transition-all duration-300"
            :class="mobileOpen ? '-rotate-45 -translate-y-2' : ''"
          ></span>
        </button>
      </div>

      <!-- Mobile menu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="mobileOpen"
          class="md:hidden mt-4 pb-4 border-t border-white/10 flex flex-col gap-1 pt-4"
        >
          <NuxtLink
            to="/"
            @click="closeMenu"
            class="px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition text-sm font-medium"
          >Home</NuxtLink>
          <NuxtLink
            to="/products"
            @click="closeMenu"
            class="px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition text-sm font-medium"
          >Products</NuxtLink>
          <NuxtLink
            to="/contacts"
            @click="closeMenu"
            class="px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition text-sm font-medium"
          >Contacts</NuxtLink>
          <NuxtLink
            to="/about"
            @click="closeMenu"
            class="px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition text-sm font-medium"
          >About Us</NuxtLink>

          <!-- Inquiry (logged-in non-admin only) -->
          <NuxtLink
            v-if="isLoggedIn && !isAdmin"
            to="/inquiry"
            @click="closeMenu"
            class="px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition text-sm font-medium"
          >Inquiry</NuxtLink>

          <!-- Admin link -->
          <NuxtLink
            v-if="isAdmin"
            to="/admin"
            @click="closeMenu"
            class="px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition text-sm font-medium"
          >Admin</NuxtLink>

          <div class="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
            <template v-if="isLoggedIn">
              <span class="px-3 text-gray-500 text-xs">Signed in as {{ user?.name?.split(' ')[0] }}</span>
              <button
                @click="doLogout"
                class="mx-3 bg-gray-800 hover:bg-gray-700 text-gray-200 px-5 py-2.5 rounded-xl border border-white/10 transition text-sm text-left"
              >Logout</button>
            </template>
            <template v-else>
              <NuxtLink
                to="/auth/register"
                @click="closeMenu"
                class="mx-3 bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white px-5 py-2.5 rounded-xl border border-white/20 transition text-sm text-center"
              >Register</NuxtLink>
              <NuxtLink
                to="/auth/login"
                @click="closeMenu"
                class="mx-3 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-red-600/30 transition text-sm text-center"
              >Login</NuxtLink>
            </template>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>
