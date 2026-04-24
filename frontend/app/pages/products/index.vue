<script setup lang="ts">
definePageMeta({ layout: 'default' })

const config = useRuntimeConfig()
const API = config.public.apiBase

const { data: products, pending, error } = await useFetch<any[]>(`${API}/api/products`)

const onImageError = (e: any) => {
  if (!e.target.dataset.fb) {
    e.target.src = '/assets/images/SM3dPrints.png'
    e.target.dataset.fb = '1'
  }
}
</script>

<template>
  <section class="bg-[#020617] min-h-screen py-16">
    <div class="max-w-7xl mx-auto px-6">
      <header class="mb-10 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-100 mb-3">3D Printed Products Showcase</h1>
        <p class="text-gray-400 max-w-2xl mx-auto">
          A quick look at some real-life 3D printed items we can create for your home, kids, workspace, and kitchen.
        </p>
      </header>

      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-24">
        <div class="w-10 h-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-16 text-gray-500">
        <p>Could not load products. Please try again later.</p>
      </div>

      <!-- Empty -->
      <div v-else-if="!products || products.length === 0" class="text-center py-16 text-gray-500">
        <p>No products available yet. Check back soon!</p>
      </div>

      <!-- Grid -->
      <div v-else class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="product in products"
          :key="product._id"
          class="bg-[#0b1120] border border-white/10 rounded-2xl overflow-hidden shadow-xl shadow-black/40 flex flex-col transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/30 hover:scale-[1.02]"
        >
          <img
            :src="product.imageUrl || '/assets/images/SM3dPrints.png'"
            :alt="product.name"
            class="h-48 w-full object-cover"
            @error="onImageError"
          />

          <div class="p-5 flex flex-col flex-1">
            <div class="flex items-start justify-between gap-2 mb-2">
              <h2 class="text-xl font-semibold text-gray-100">{{ product.name }}</h2>
              <span
                v-if="product.price"
                class="shrink-0 text-sm font-semibold text-red-400"
              >₹{{ product.price }}</span>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{{ product.description }}</p>

            <div class="mt-auto flex justify-between items-center">
              <span v-if="product.category" class="text-xs uppercase tracking-wide text-gray-500">
                {{ product.category }}
              </span>
              <span v-else class="text-xs" />

              <NuxtLink
                :to="`/products/${product._id}`"
                class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
              >
                View details
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
