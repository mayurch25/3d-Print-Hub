<template>
  <footer class="bg-[#0b1120] border-t border-white/10">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <div class="grid md:grid-cols-3 gap-10 text-gray-300">
        <!-- Brand -->
        <div>
          <h2 class="text-xl font-semibold text-white mb-4">SM 3D Print Hub</h2>
          <p class="text-gray-400 leading-relaxed">
            Premium 3D printing solutions for custom models, prototypes, and
            creative designs.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/"
                class="hover:text-red-500 transition duration-300"
              >
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/products"
                class="hover:text-red-500 transition duration-300"
              >
                Products
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/contacts"
                class="hover:text-red-500 transition duration-300"
              >
                Contacts
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/about"
                class="hover:text-red-500 transition duration-300"
              >
                About
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-lg font-semibold text-white mb-4">Contact</h3>

          <!-- Email -->
          <p class="text-gray-400">
            Email:
            <a
              href="mailto:info@sm3dprinthub.com"
              class="hover:text-red-500 transition duration-300"
            >
              info@sm3dprinthub.com
            </a>
          </p>

          <!-- Phone Numbers -->
          <div class="mt-4 space-y-2 text-gray-400">
            <div class="flex items-center space-x-2">
              <span class="text-gray-500">📞</span>
              <a
                href="tel:+919421674880"
                class="hover:text-red-500 transition duration-300"
              >
                +91 94216 74880
              </a>
            </div>

            <div class="flex items-center space-x-2">
              <span class="text-gray-500">📞</span>
              <a
                href="tel:+917879645914"
                class="hover:text-red-500 transition duration-300"
              >
                +91 78796 45914
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div
        class="border-t border-white/10 mt-10 pt-6 text-center text-gray-500 text-sm"
      >
        © 2026 <span class="text-gray-300 font-medium">SM 3D Print Hub</span>.
        All rights reserved.
      </div>
    </div>
  </footer>
</template>
