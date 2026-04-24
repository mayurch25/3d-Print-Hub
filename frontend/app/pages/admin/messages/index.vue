<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const config = useRuntimeConfig()
const API = config.public.apiBase
const { token } = useAuth()

const messages = ref<any[]>([])
const loading = ref(true)
const expanded = ref<string | null>(null)
const toast = ref('')

onMounted(async () => {
  try {
    const res = await $fetch<any[]>(`${API}/api/messages`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    messages.value = res
  } catch {}
  loading.value = false
})

const toggle = (id: string) => {
  expanded.value = expanded.value === id ? null : id
  const msg = messages.value.find(m => m._id === id)
  if (msg && msg.status === 'new') {
    updateStatus(id, 'read')
  }
}

const updateStatus = async (id: string, status: string) => {
  try {
    await $fetch(`${API}/api/messages/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token.value}` },
      body: { status }
    })
    const msg = messages.value.find(m => m._id === id)
    if (msg) msg.status = status
    showToast(`Marked as ${status}.`)
  } catch {
    showToast('Failed to update status.')
  }
}

const doDelete = async (id: string) => {
  if (!confirm('Delete this message?')) return
  try {
    await $fetch(`${API}/api/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` }
    })
    messages.value = messages.value.filter(m => m._id !== id)
    if (expanded.value === id) expanded.value = null
    showToast('Message deleted.')
  } catch {
    showToast('Failed to delete message.')
  }
}

const showToast = (msg: string) => {
  toast.value = msg
  setTimeout(() => { toast.value = '' }, 3000)
}

const statusColor = (s: string) => {
  if (s === 'new') return 'bg-red-500/15 text-red-400 border-red-500/30'
  if (s === 'read') return 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30'
  return 'bg-green-500/15 text-green-400 border-green-500/30'
}

const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', {
  day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
})
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-100">Messages</h1>
      <p class="text-gray-400 text-sm mt-1">Product enquiries from customers.</p>
    </div>

    <div v-if="loading" class="flex justify-center py-16">
      <div class="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else-if="messages.length === 0" class="text-center py-16 text-gray-500">
      No messages yet. They'll appear here when customers submit enquiries.
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="msg in messages"
        :key="msg._id"
        class="bg-[#0b1120] border border-white/10 rounded-2xl overflow-hidden shadow-xl transition duration-300"
        :class="msg.status === 'new' ? 'border-red-500/30' : ''"
      >
        <!-- Header row -->
        <div
          class="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-white/[0.02]"
          @click="toggle(msg._id)"
        >
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 flex-wrap">
              <span class="font-semibold text-gray-100">{{ msg.name }}</span>
              <span
                class="text-xs px-2 py-0.5 rounded-full border font-medium"
                :class="statusColor(msg.status)"
              >{{ msg.status }}</span>
            </div>
            <p class="text-gray-500 text-xs mt-0.5 truncate">
              {{ msg.email }} {{ msg.phone ? `· ${msg.phone}` : '' }}
              <span v-if="msg.productName" class="text-gray-600"> · re: {{ msg.productName }}</span>
            </p>
          </div>
          <div class="text-right shrink-0">
            <p class="text-gray-600 text-xs">{{ formatDate(msg.createdAt) }}</p>
          </div>
          <span class="text-gray-500 text-sm transition-transform duration-200" :class="expanded === msg._id ? 'rotate-180' : ''">▾</span>
        </div>

        <!-- Expanded detail -->
        <div v-if="expanded === msg._id" class="border-t border-white/5 px-6 py-5">
          <p class="text-gray-300 text-sm leading-relaxed whitespace-pre-line mb-5">{{ msg.message }}</p>
          <div class="flex flex-wrap gap-3">
            <button
              v-if="msg.status !== 'replied'"
              @click="updateStatus(msg._id, 'replied')"
              class="px-4 py-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 text-sm font-medium border border-green-500/20 transition"
            >Mark as Replied</button>
            <button
              v-if="msg.status === 'read'"
              @click="updateStatus(msg._id, 'new')"
              class="px-4 py-2 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 text-sm font-medium border border-yellow-500/20 transition"
            >Mark as New</button>
            <a
              :href="`mailto:${msg.email}`"
              class="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-medium transition"
            >Reply via Email</a>
            <button
              @click="doDelete(msg._id)"
              class="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium border border-red-500/20 transition"
            >Delete</button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="toast"
      class="fixed bottom-6 right-6 px-5 py-3 bg-[#0b1120] border border-white/10 rounded-xl text-gray-200 text-sm shadow-2xl"
    >{{ toast }}</div>
  </div>
</template>
