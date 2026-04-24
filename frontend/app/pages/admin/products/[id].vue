<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const config = useRuntimeConfig()
const API = config.public.apiBase
const { token } = useAuth()
const route = useRoute()

const id = route.params.id as string
const loading = ref(true)
const saving = ref(false)
const error = ref('')
const toast = ref('')

const form = reactive({
  name: '',
  description: '',
  imageUrl: '',
  price: '',
  category: '',
  inStock: true,
  published: false,
})

onMounted(async () => {
  try {
    const product = await $fetch<any>(`${API}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    form.name = product.name ?? ''
    form.description = product.description ?? ''
    form.imageUrl = product.imageUrl ?? ''
    form.price = product.price != null ? String(product.price) : ''
    form.category = product.category ?? ''
    form.inStock = product.inStock ?? true
    form.published = product.published ?? false
  } catch {
    error.value = 'Failed to load product.'
  }
  loading.value = false
})

const submit = async () => {
  error.value = ''
  if (!form.name.trim()) {
    error.value = 'Product name is required.'
    return
  }
  saving.value = true
  try {
    await $fetch(`${API}/api/products/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token.value}` },
      body: { ...form, price: form.price ? Number(form.price) : undefined }
    })
    toast.value = 'Product updated!'
    setTimeout(() => { toast.value = '' }, 3000)
  } catch (err: any) {
    error.value = err?.data?.message || 'Failed to update product.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl">
    <div class="mb-8">
      <NuxtLink to="/admin/products" class="text-sm text-gray-400 hover:text-red-400 transition">
        ← Back to products
      </NuxtLink>
      <h1 class="text-2xl font-bold text-gray-100 mt-3">Edit Product</h1>
    </div>

    <div v-if="loading" class="flex justify-center py-16">
      <div class="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else class="bg-[#0b1120] border border-white/10 rounded-2xl p-8 shadow-xl">
      <form @submit.prevent="submit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Product Name <span class="text-red-500">*</span></label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
          <textarea
            v-model="form.description"
            rows="5"
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
          <div v-if="form.imageUrl" class="mt-3 rounded-xl overflow-hidden border border-white/10">
            <img :src="form.imageUrl" alt="preview" class="w-full h-40 object-cover" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1.5">Price (₹)</label>
            <input
              v-model="form.price"
              type="number"
              min="0"
              class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:border-red-500 transition"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
            <input
              v-model="form.category"
              type="text"
              class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:border-red-500 transition"
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
            :disabled="saving"
            class="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold shadow-lg shadow-red-600/30 transition"
          >
            {{ saving ? 'Saving…' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>

    <div
      v-if="toast"
      class="fixed bottom-6 right-6 px-5 py-3 bg-[#0b1120] border border-red-500/30 rounded-xl text-green-400 text-sm shadow-2xl"
    >{{ toast }}</div>
  </div>
</template>
