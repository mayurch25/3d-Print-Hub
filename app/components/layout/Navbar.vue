<template>
  <nav class="relative bg-[#0b1120] border-b border-white/10 shadow-2xl">
    <!-- subtle glow layer -->
    <div
      class="absolute inset-0 bg-gradient-radial from-[#1e293b]/40 via-transparent to-transparent opacity-70"
    ></div>

    <div
      class="relative max-w-7xl mx-auto px-6 py-4 flex justify-between items-center"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center">
        <img
          src="/assets/images/SM3dPrints.png"
          alt="SM 3D Print Hub"
          class="h-20 md:h-24 w-auto object-contain"
        />
      </NuxtLink>

      <!-- Menu -->
      <div class="hidden md:flex space-x-10 font-medium tracking-wide">
        <NuxtLink
          to="/"
          class="text-gray-300 hover:text-red-500 transition duration-300 relative group"
        >
          Home
          <span
            class="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full group-[.router-link-active]:w-full"
          ></span>
        </NuxtLink>

        <NuxtLink
          to="/products"
          class="text-gray-300 hover:text-red-500 transition duration-300 relative group"
        >
          Products
          <span
            class="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full group-[.router-link-active]:w-full"
          ></span>
        </NuxtLink>

        <NuxtLink
          to="/contacts"
          class="text-gray-300 hover:text-red-500 transition duration-300 relative group"
        >
          Contacts
          <span
            class="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full group-[.router-link-active]:w-full"
          ></span>
        </NuxtLink>

        <NuxtLink
          to="/about"
          class="text-gray-300 hover:text-red-500 transition duration-300 relative group"
        >
          About US
          <span
            class="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full group-[.router-link-active]:w-full"
          ></span>
        </NuxtLink>
      </div>

      <!-- Cart Button -->
      <button
        class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl shadow-lg shadow-red-600/30 transition duration-300"
      >
        Cart
      </button>
    </div>
  </nav>
</template>
