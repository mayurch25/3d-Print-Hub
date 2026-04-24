<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const config = useRuntimeConfig()
const API = config.public.apiBase
const { token } = useAuth()

const products = ref<any[]>([])
const loading = ref(true)
const deleteId = ref<string | null>(null)
const toast = ref('')

const fetchProducts = async () => {
  loading.value = true
  try {
    const res = await $fetch(`${API}/api/products`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    products.value = res as any[]
  } catch {}
  loading.value = false
}

onMounted(fetchProducts)

const confirmDelete = (id: string) => { deleteId.value = id }

const doDelete = async () => {
  if (!deleteId.value) return
  try {
    await $fetch(`${API}/api/products/${deleteId.value}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` }
    })
    products.value = products.value.filter(p => p._id !== deleteId.value)
    showToast('Product deleted.')
  } catch {
    showToast('Failed to delete product.')
  }
  deleteId.value = null
}

const showToast = (msg: string) => {
  toast.value = msg
  setTimeout(() => { toast.value = '' }, 3000)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-100">Products</h1>
        <p class="text-gray-400 text-sm mt-1">Manage your 3D printed product catalog.</p>
      </div>
      <NuxtLink
        to="/admin/products/new"
        class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg shadow-red-600/30 transition text-sm"
      >
        + Add Product
      </NuxtLink>
    </div>

    <div v-if="loading" class="flex justify-center py-16">
      <div class="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else-if="products.length === 0" class="text-center py-16 text-gray-500">
      <p class="text-lg mb-4">No products yet.</p>
      <NuxtLink to="/admin/products/new" class="text-red-400 hover:text-red-300">Add your first product →</NuxtLink>
    </div>

    <div v-else class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="product in products"
        :key="product._id"
        class="bg-[#0b1120] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-red-500/10 hover:border-red-500/30 transition duration-300"
      >
        <img
          :src="product.imageUrl || '/assets/images/SM3dPrints.png'"
          :alt="product.name"
          class="w-full h-40 object-cover"
          @error="(e: any) => { if (!e.target.dataset.fb) { e.target.src='/assets/images/SM3dPrints.png'; e.target.dataset.fb='1' } }"
        />
        <div class="p-5">
          <div class="flex items-start justify-between gap-2 mb-2">
            <h3 class="text-gray-100 font-semibold leading-tight">{{ product.name }}</h3>
            <div class="flex flex-col items-end gap-1 shrink-0">
              <span
                class="text-xs px-2 py-0.5 rounded-full font-medium"
                :class="product.published ? 'bg-green-500/15 text-green-400' : 'bg-yellow-500/15 text-yellow-500'"
              >
                {{ product.published ? 'Published' : 'Draft' }}
              </span>
              <span
                class="text-xs px-2 py-0.5 rounded-full font-medium"
                :class="product.inStock ? 'bg-blue-500/15 text-blue-400' : 'bg-red-500/15 text-red-400'"
              >
                {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
              </span>
            </div>
          </div>
          <p class="text-gray-500 text-xs mb-1">{{ product.category || 'Uncategorized' }}</p>
          <p class="text-gray-400 text-sm line-clamp-2 mb-4">{{ product.description }}</p>
          <div v-if="product.price" class="text-red-400 font-semibold mb-4">₹{{ product.price }}</div>
          <div class="flex gap-3">
            <NuxtLink
              :to="`/admin/products/${product._id}`"
              class="flex-1 text-center py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-medium transition"
            >
              Edit
            </NuxtLink>
            <button
              @click="confirmDelete(product._id)"
              class="flex-1 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition border border-red-500/20"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="deleteId" class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
      <div class="bg-[#0b1120] border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl">
        <h3 class="text-lg font-semibold text-gray-100 mb-2">Delete Product?</h3>
        <p class="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
        <div class="flex gap-4">
          <button
            @click="deleteId = null"
            class="flex-1 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium transition"
          >Cancel</button>
          <button
            @click="doDelete"
            class="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition"
          >Delete</button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div
      v-if="toast"
      class="fixed bottom-6 right-6 px-5 py-3 bg-[#0b1120] border border-white/10 rounded-xl text-gray-200 text-sm shadow-2xl"
    >{{ toast }}</div>
  </div>
</template>
