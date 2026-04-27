<script setup lang="ts">
definePageMeta({ layout: 'products' })

const config = useRuntimeConfig()
const API = config.public.apiBase
const route = useRoute()
const id = route.params.id as string
const { isLoggedIn, user, token, init } = useAuth()

const { data: product, pending, error } = await useFetch<any>(`${API}/api/products/${id}`)

const activeImage = ref(0)

const productImages = computed(() => {
  const imgs = product.value?.images ?? []
  return imgs.length > 0 ? imgs : ['/assets/images/SM3dPrints.png']
})

const onImageError = (e: any) => {
  if (!e.target.dataset.fb) {
    e.target.src = '/assets/images/SM3dPrints.png'
    e.target.dataset.fb = '1'
  }
}

const form = reactive({ name: '', email: '', phone: '', message: '' })
const formError = ref('')
const formSuccess = ref(false)
const submitting = ref(false)

onMounted(() => {
  init()
  if (user.value) {
    form.name = user.value.name || ''
    form.email = user.value.email || ''
  }
})

const submitInquiry = async () => {
  formError.value = ''
  if (!form.name || !form.email || !form.message) {
    formError.value = 'Name, email, and message are required.'
    return
  }
  submitting.value = true
  try {
    await $fetch(`${API}/api/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        productId: product.value?._id,
        productName: product.value?.name,
        message: form.message
      }
    })
    formSuccess.value = true
    form.name = ''
    form.email = ''
    form.phone = ''
    form.message = ''
  } catch (err: any) {
    formError.value = err?.data?.message || 'Failed to send enquiry. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="bg-[#020617] min-h-screen py-16">
    <div class="max-w-5xl mx-auto px-6">
      <NuxtLink to="/products" class="inline-flex items-center text-sm text-gray-400 hover:text-red-400 mb-6">
        ← Back to products
      </NuxtLink>

      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-24">
        <div class="w-10 h-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Error / not found -->
      <div v-else-if="error || !product" class="bg-[#0b1120] border border-red-500/40 text-red-300 rounded-xl p-6 mt-6">
        <h2 class="text-lg font-semibold mb-2">Product not found</h2>
        <p class="text-sm text-gray-400">We couldn't find a product with this ID.</p>
      </div>

      <template v-else>
        <!-- Product card -->
        <div class="bg-[#0b1120] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 md:flex">
          <!-- Image gallery -->
          <div class="w-full md:w-1/2 flex flex-col">
            <img
              :src="productImages[activeImage]"
              :alt="product.name"
              class="w-full h-72 md:h-80 object-cover"
              @error="onImageError"
            />
            <div v-if="productImages.length > 1" class="flex gap-2 p-3 bg-[#0b1120] overflow-x-auto">
              <button
                v-for="(src, i) in productImages"
                :key="i"
                type="button"
                @click="activeImage = Number(i)"
                class="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition"
                :class="activeImage === i ? 'border-red-500' : 'border-white/10 opacity-60 hover:opacity-100'"
              >
                <img :src="src" class="w-full h-full object-cover" @error="onImageError" />
              </button>
            </div>
          </div>

          <div class="p-6 md:p-8 flex-1">
            <div class="flex items-start justify-between gap-3 mb-2">
              <p v-if="product.category" class="text-xs uppercase tracking-wide text-gray-500">{{ product.category }}</p>
              <span
                class="shrink-0 text-xs px-2 py-0.5 rounded-full font-medium"
                :class="product.inStock ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'"
              >{{ product.inStock ? 'In Stock' : 'Out of Stock' }}</span>
            </div>
            <h1 class="text-2xl md:text-3xl font-semibold text-gray-100 mb-4">{{ product.name }}</h1>
            <div v-if="product.price" class="flex items-center gap-3 mb-4">
              <p class="text-2xl font-bold text-red-400">₹{{ product.price }}</p>
              <span
                v-if="product.originalPrice && product.originalPrice > product.price"
                class="text-lg text-gray-500 line-through"
              >₹{{ product.originalPrice }}</span>
              <span
                v-if="product.originalPrice && product.originalPrice > product.price"
                class="text-sm font-semibold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-lg"
              >{{ Math.round((1 - product.price / product.originalPrice) * 100) }}% off</span>
            </div>
            <p class="whitespace-pre-line text-gray-300 leading-relaxed mb-6">{{ product.description }}</p>

            <a
              href="#enquiry"
              class="inline-block px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg shadow-red-600/30 transition"
            >
              Request this print
            </a>
          </div>
        </div>

        <!-- Enquiry form -->
        <div id="enquiry" class="mt-10 bg-[#0b1120] border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/40">
          <h2 class="text-xl font-semibold text-gray-100 mb-1">Send an Enquiry</h2>
          <p class="text-gray-400 text-sm mb-6">Interested in <span class="text-red-400">{{ product.name }}</span>? Fill in your details and we'll get back to you.</p>

          <ClientOnly>
            <!-- Not logged in -->
            <div v-if="!isLoggedIn" class="flex flex-col items-center gap-4 py-8 bg-[#0f172a] border border-white/10 rounded-xl text-center">
              <p class="text-gray-400">Please login or create an account to send an enquiry.</p>
              <div class="flex gap-3">
                <NuxtLink
                  :to="`/auth/login?redirect=/products/${id}`"
                  class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg shadow-red-600/30 transition text-sm"
                >Login</NuxtLink>
                <NuxtLink
                  to="/auth/register"
                  class="px-5 py-2.5 rounded-xl bg-transparent hover:bg-gray-800 border border-white/20 text-gray-300 hover:text-white font-medium transition text-sm"
                >Register</NuxtLink>
              </div>
            </div>

            <!-- Logged in -->
            <template v-else>
              <div v-if="formSuccess" class="px-5 py-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm mb-6">
                Your enquiry has been sent! We'll be in touch soon.
              </div>

              <form v-else @submit.prevent="submitInquiry" class="space-y-5">
                <div class="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1.5">Name <span class="text-red-500">*</span></label>
                    <input
                      v-model="form.name"
                      type="text"
                      placeholder="Your name"
                      class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1.5">Email <span class="text-red-500">*</span></label>
                    <input
                      v-model="form.email"
                      type="email"
                      placeholder="you@example.com"
                      class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1.5">Phone <span class="text-gray-500">(optional)</span></label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1.5">Message <span class="text-red-500">*</span></label>
                  <textarea
                    v-model="form.message"
                    rows="4"
                    placeholder="Tell us your requirements, quantity, color preferences..."
                    class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-500 transition resize-none"
                  />
                </div>

                <div v-if="formError" class="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  {{ formError }}
                </div>

                <button
                  type="submit"
                  :disabled="submitting"
                  class="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold shadow-lg shadow-red-600/30 transition"
                >
                  {{ submitting ? 'Sending…' : 'Send Enquiry' }}
                </button>
              </form>
            </template>
          </ClientOnly>
        </div>
      </template>
    </div>
  </section>
</template>
