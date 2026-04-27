<script setup lang="ts">
const { isLoggedIn, isAdmin, user, token, init } = useAuth()
const config = useRuntimeConfig()
const router = useRouter()

onMounted(() => {
  init()
  if (!isLoggedIn.value || isAdmin.value) {
    router.push('/auth/login')
    return
  }
  form.name = user.value?.name ?? ''
  form.email = user.value?.email ?? ''
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const submitting = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const toastError = ref(false);
let toastTimeout: ReturnType<typeof setTimeout>

const triggerToast = (msg: string, error = false) => {
  toastMessage.value = msg
  toastError.value = error
  showToast.value = true
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => { showToast.value = false }, 4000)
}

const submit = async () => {
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    triggerToast('Please fill in all required fields.', true)
    return
  }

  submitting.value = true
  try {
    await $fetch(`${config.public.apiBase}/api/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.subject.trim()
          ? `[${form.subject.trim()}]\n\n${form.message.trim()}`
          : form.message.trim(),
      },
    })
    triggerToast('Your inquiry has been sent! We\'ll be in touch soon.')
    form.phone = ''
    form.subject = ''
    form.message = ''
  } catch {
    triggerToast('Something went wrong. Please try again.', true)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#020617] px-6 py-16 relative overflow-hidden">
    <!-- Background glow -->
    <div class="absolute w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[150px] top-0 left-1/2 -translate-x-1/2"></div>

    <!-- Toast -->
    <transition name="toast-fade">
      <div v-if="showToast" class="fixed bottom-6 inset-x-0 flex justify-center z-50">
        <div
          class="border px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm"
          :class="toastError
            ? 'bg-[#020617] border-red-500/60 text-gray-100 shadow-red-500/20'
            : 'bg-[#020617] border-green-500/60 text-gray-100 shadow-green-500/20'"
        >
          <span class="inline-block h-2 w-2 rounded-full animate-pulse" :class="toastError ? 'bg-red-500' : 'bg-green-500'"></span>
          {{ toastMessage }}
        </div>
      </div>
    </transition>

    <div class="relative max-w-2xl mx-auto z-10">
      <!-- Header -->
      <div class="mb-10">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm transition mb-6">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </NuxtLink>
        <span class="block text-red-500 text-xs uppercase tracking-[4px] mb-3">Get in Touch</span>
        <h1 class="text-4xl font-bold text-gray-100">Send an Inquiry</h1>
        <p class="text-gray-500 mt-3">Have a custom requirement or a question? Fill in the form below and we'll get back to you shortly.</p>
      </div>

      <!-- Form card -->
      <div class="bg-[#0b1120] border border-white/5 rounded-2xl p-8">
        <form @submit.prevent="submit" class="space-y-5">
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-gray-400 text-sm mb-2">Name <span class="text-red-500">*</span></label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Your full name"
                class="w-full px-4 py-3 rounded-xl bg-[#020617] border border-white/10 text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition text-sm"
              />
            </div>
            <div>
              <label class="block text-gray-400 text-sm mb-2">Email <span class="text-red-500">*</span></label>
              <input
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                class="w-full px-4 py-3 rounded-xl bg-[#020617] border border-white/10 text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition text-sm"
              />
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-gray-400 text-sm mb-2">Phone <span class="text-gray-600 text-xs">(optional)</span></label>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="+91 98765 43210"
                class="w-full px-4 py-3 rounded-xl bg-[#020617] border border-white/10 text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition text-sm"
              />
            </div>
            <div>
              <label class="block text-gray-400 text-sm mb-2">Subject <span class="text-gray-600 text-xs">(optional)</span></label>
              <input
                v-model="form.subject"
                type="text"
                placeholder="e.g. Custom figurine, bulk order…"
                class="w-full px-4 py-3 rounded-xl bg-[#020617] border border-white/10 text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition text-sm"
              />
            </div>
          </div>

          <div>
            <label class="block text-gray-400 text-sm mb-2">Message <span class="text-red-500">*</span></label>
            <textarea
              v-model="form.message"
              rows="6"
              placeholder="Describe your requirement — material, size, quantity, deadline, or anything else…"
              class="w-full px-4 py-3 rounded-xl bg-[#020617] border border-white/10 text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition text-sm resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="submitting"
            class="w-full py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition shadow-lg shadow-red-600/30 text-sm"
          >
            {{ submitting ? 'Sending…' : 'Send Inquiry' }}
          </button>
        </form>
      </div>

      <!-- Contact info strip -->
      <div class="mt-8 grid sm:grid-cols-2 gap-4">
        <div class="bg-[#0b1120] border border-white/5 rounded-xl px-5 py-4 flex items-center gap-4">
          <div class="h-9 w-9 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <div>
            <p class="text-gray-500 text-xs">Email us</p>
            <p class="text-gray-300 text-sm font-medium">sm3dprinthub@gmail.com</p>
          </div>
        </div>
        <div class="bg-[#0b1120] border border-white/5 rounded-xl px-5 py-4 flex items-center gap-4">
          <div class="h-9 w-9 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </div>
          <div>
            <p class="text-gray-500 text-xs">Call us</p>
            <p class="text-gray-300 text-sm font-medium">+91 94216 74880</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
