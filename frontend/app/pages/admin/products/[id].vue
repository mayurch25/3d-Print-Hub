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
  price: '',
  originalPrice: '',
  category: '',
  inStock: true,
  published: false,
})

const existingImages = ref<string[]>([])
const newFiles = ref<File[]>([])
const newPreviews = ref<string[]>([])

const totalImageCount = computed(() => existingImages.value.length + newFiles.value.length)

onMounted(async () => {
  try {
    const product = await $fetch<any>(`${API}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    form.name = product.name ?? ''
    form.description = product.description ?? ''
    form.price = product.price != null ? String(product.price) : ''
    form.originalPrice = product.originalPrice != null ? String(product.originalPrice) : ''
    form.category = product.category ?? ''
    form.inStock = product.inStock ?? true
    form.published = product.published ?? false
    existingImages.value = product.images ?? []
  } catch {
    error.value = 'Failed to load product.'
  }
  loading.value = false
})

const onFileSelect = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (!input.files) return
  const remaining = 4 - totalImageCount.value
  const toAdd = Array.from(input.files).slice(0, remaining)
  toAdd.forEach(file => {
    newFiles.value.push(file)
    const reader = new FileReader()
    reader.onload = (ev) => newPreviews.value.push(ev.target?.result as string)
    reader.readAsDataURL(file)
  })
  input.value = ''
}

const removeExisting = (index: number) => {
  existingImages.value.splice(index, 1)
}

const removeNew = (index: number) => {
  newFiles.value.splice(index, 1)
  newPreviews.value.splice(index, 1)
}

const submit = async () => {
  error.value = ''
  if (!form.name.trim()) {
    error.value = 'Product name is required.'
    return
  }
  saving.value = true
  try {
    let uploadedUrls: string[] = []
    if (newFiles.value.length > 0) {
      const fd = new FormData()
      newFiles.value.forEach(f => fd.append('images', f))
      const res = await $fetch<{ urls: string[] }>(`${API}/api/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
        body: fd,
      })
      uploadedUrls = res.urls
    }
    const images = [...existingImages.value, ...uploadedUrls]
    await $fetch(`${API}/api/products/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token.value}` },
      body: { ...form, images, price: form.price ? Number(form.price) : undefined, originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined }
    })
    existingImages.value = images
    newFiles.value = []
    newPreviews.value = []
    toast.value = 'Product updated!'
    setTimeout(() => { toast.value = '' }, 3000)
  } catch (err: any) {
    error.value = err?.data?.message || err?.message || 'Failed to update product.'
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

        <!-- Product Images -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">
            Product Images
            <span class="text-gray-500 font-normal ml-1">(up to 4)</span>
          </label>

          <div v-if="existingImages.length > 0 || newPreviews.length > 0" class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            <!-- Existing images -->
            <div
              v-for="(src, i) in existingImages"
              :key="`ex-${i}`"
              class="relative group rounded-xl overflow-hidden border border-white/10 aspect-square"
            >
              <img :src="src" class="w-full h-full object-cover" />
              <button
                type="button"
                @click="removeExisting(i)"
                class="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/70 text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-xs font-bold"
              >✕</button>
              <div v-if="i === 0 && newPreviews.length === 0" class="absolute bottom-0 inset-x-0 text-center text-xs text-gray-400 bg-black/50 py-0.5">Cover</div>
            </div>

            <!-- New file previews -->
            <div
              v-for="(src, i) in newPreviews"
              :key="`new-${i}`"
              class="relative group rounded-xl overflow-hidden border border-red-500/30 aspect-square"
            >
              <img :src="src" class="w-full h-full object-cover" />
              <button
                type="button"
                @click="removeNew(i)"
                class="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/70 text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-xs font-bold"
              >✕</button>
              <div class="absolute bottom-0 inset-x-0 text-center text-xs text-yellow-400 bg-black/50 py-0.5">New</div>
            </div>
          </div>

          <!-- Upload button (visible when below 4 total) -->
          <label
            v-if="totalImageCount < 4"
            class="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer hover:border-red-500/50 hover:bg-red-500/5 transition"
          >
            <svg class="h-8 w-8 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <p class="text-gray-500 text-sm">Click to upload images</p>
            <p class="text-gray-600 text-xs mt-1">PNG, JPG up to 5MB each — {{ 4 - totalImageCount }} slot(s) remaining</p>
            <input type="file" accept="image/*" multiple class="hidden" @change="onFileSelect" />
          </label>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1.5">Original Price (₹) <span class="text-gray-500 font-normal">MRP</span></label>
            <input
              v-model="form.originalPrice"
              type="number"
              min="0"
              class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:border-red-500 transition"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1.5">Selling Price (₹)</label>
            <input
              v-model="form.price"
              type="number"
              min="0"
              class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:border-red-500 transition"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
          <input
            v-model="form.category"
            type="text"
            class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:border-red-500 transition"
          />
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
