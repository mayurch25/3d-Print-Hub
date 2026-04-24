<template>
  <nav class="relative bg-[#0b1120] border-b border-white/10 shadow-2xl">
    <!-- subtle glow layer -->
    <div
      class="absolute inset-0 bg-gradient-radial from-[#1e293b]/40 via-transparent to-transparent opacity-70"
    ></div>

    <div
      class="relative max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="flex items-center justify-center sm:justify-start"
      >
        <img
          src="/assets/images/SM3dPrints.png"
          alt="SM 3D Print Hub"
          class="h-16 md:h-20 w-auto object-contain"
        />
      </NuxtLink>

      <!-- Simple Menu (no hamburger) -->
      <div
        class="flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-medium tracking-wide text-sm sm:text-base"
      >
        <NuxtLink
          to="/"
          class="text-gray-300 hover:text-red-500 transition duration-300"
        >
          Home
        </NuxtLink>

        <NuxtLink
          to="/products"
          class="text-gray-300 hover:text-red-500 transition duration-300"
        >
          Products
        </NuxtLink>

        <NuxtLink
          to="/contacts"
          class="text-gray-300 hover:text-red-500 transition duration-300"
        >
          Contacts
        </NuxtLink>

        <NuxtLink
          to="/about"
          class="text-gray-300 hover:text-red-500 transition duration-300"
        >
          About Us
        </NuxtLink>

        <button
          class="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl shadow-lg shadow-red-600/30 transition duration-300"
        >
          Cart
        </button>
      </div>
    </div>
  </nav>
</template>
