<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const config = useRuntimeConfig()
const API = config.public.apiBase
const { token } = useAuth()
const router = useRouter()

const form = reactive({
  name: '',
  description: '',
  imageUrl: '',
  price: '',
  category: '',
  inStock: true,
  published: false,
})
const error = ref('')
const loading = ref(false)

const submit = async () => {
  error.value = ''
  if (!form.name.trim()) {
    error.value = 'Product name is required.'
    return
  }
  loading.value = true
  try {
    await $fetch(`${API}/api/products`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: {
        ...form,
        price: form.price ? Number(form.price) : undefined
      }
    })
    router.push('/admin/products')
  } catch (err: any) {
    error.value = err?.data?.message || 'Failed to create product.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl">
    <div class="mb-8">
      <NuxtLink to="/admin/products" class="text-sm text-gray-400 hover:text-red-400 transition">
        ← Back to products
      </NuxtLink>
      <h1 class="text-2xl font-bold text-gray-100 mt-3">Add New Product</h1>
    </div>

    <div class="bg-[#0b1120] border border-white/10 rounded-2xl p-8 shadow-xl">
      <form @submit.prevent="submit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Product Name <span class="text-red-500">*</span></label>
          <input
            v-model="form.name"
            type="text"
            placeholder="e.g. Geometric Planter Pot"
            class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Describe the product..."
            class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-500 transition resize-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Image URL</label>
          <input
            v-model="form.imageUrl"
            type="url"
            placeholder="https://..."
            class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1.5">Price (₹)</label>
            <input
              v-model="form.price"
              type="number"
              min="0"
              placeholder="0"
              class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
            <input
              v-model="form.category"
              type="text"
              placeholder="e.g. Home Decor"
              class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
            />
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="form.inStock = !form.inStock"
            :class="form.inStock ? 'bg-red-600' : 'bg-gray-700'"
            class="relative w-11 h-6 rounded-full transition-colors duration-200"
          >
            <span
              :class="form.inStock ? 'translate-x-5' : 'translate-x-0.5'"
              class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
            />
          </button>
          <label class="text-sm text-gray-300">In Stock</label>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="form.published = !form.published"
            :class="form.published ? 'bg-green-600' : 'bg-gray-700'"
            class="relative w-11 h-6 rounded-full transition-colors duration-200"
          >
            <span
              :class="form.published ? 'translate-x-5' : 'translate-x-0.5'"
              class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
            />
          </button>
          <div>
            <label class="text-sm text-gray-300">Publish (Show to Public)</label>
            <p class="text-xs text-gray-500 mt-0.5">{{ form.published ? 'Visible on the public products page.' : 'Hidden from public — draft only.' }}</p>
          </div>
        </div>

        <div v-if="error" class="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
          {{ error }}
        </div>

        <div class="flex gap-4 pt-2">
          <NuxtLink
            to="/admin/products"
            class="flex-1 text-center py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium transition"
          >Cancel</NuxtLink>
          <button
            type="submit"
            :disabled="loading"
            class="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold shadow-lg shadow-red-600/30 transition"
          >
            {{ loading ? 'Saving…' : 'Add Product' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
