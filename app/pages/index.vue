<script setup>
const email = ref("");
const showToast = ref(false);
const toastMessage = ref("");

let toastTimeout;

const triggerToast = (message) => {
  toastMessage.value = message;
  showToast.value = true;

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const handleNotify = () => {
  if (!email.value.trim()) {
    triggerToast("Please enter your email address first.");
    return;
  }

  triggerToast(
    "Thank you! We've received your email and will keep you updated.",
  );
  email.value = "";
};
</script>

<template>
  <div class="relative">
    <!-- Toast -->
    <transition name="toast-fade">
      <div
        v-if="showToast"
        class="fixed bottom-6 inset-x-0 flex justify-center z-50"
      >
        <div
          class="bg-[#020617] border border-red-500/60 text-gray-100 px-4 py-3 rounded-xl shadow-xl shadow-red-500/40 flex items-center gap-3"
        >
          <span
            class="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse"
          ></span>
          <span class="text-sm">
            {{ toastMessage }}
          </span>
        </div>
      </div>
    </transition>

    <!-- Hero -->
    <div
      class="h-screen flex items-center justify-center bg-[#0b1120] relative overflow-hidden px-6"
    >
      <!-- Background Glow -->
      <div
        class="absolute w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[150px]"
      ></div>

      <!-- Content -->
      <div class="relative text-center max-w-2xl">
        <!-- Brand Name -->
        <h2 class="text-red-500 tracking-[4px] text-sm uppercase mb-4">
          3D Print Hub
        </h2>

        <!-- Main Heading -->
        <h1
          class="text-5xl md:text-7xl font-extrabold tracking-wider text-gray-200 animate-glow"
        >
          COMING SOON
        </h1>

        <!-- Tagline -->
        <p class="mt-6 text-gray-400 text-lg leading-relaxed">
          The future of 3D printed innovation is almost here. Premium designs.
          Precision printing. Limitless creativity.
        </p>

        <!-- For responsive view -->
        <div class="mt-8">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="px-4 py-3 w-full md:w-96 rounded-lg bg-gray-900 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <!-- CTA Buttons -->
        <div
          class="mt-4 lg:mt-8 flex flex-col md:flex-row gap-4 justify-center"
        >
          <button
            class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
            @click="handleNotify"
          >
            Notify Me
          </button>

          <button
            class="px-6 py-3 border border-gray-500 text-gray-300 hover:bg-gray-800 rounded-lg transition"
          >
            Explore Soon
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes glow {
  0% {
    text-shadow:
      0 0 5px #ef4444,
      0 0 10px #ef4444,
      0 0 20px #ef4444;
  }
  50% {
    text-shadow:
      0 0 20px #ef4444,
      0 0 40px #ef4444,
      0 0 80px #ef4444;
  }
  100% {
    text-shadow:
      0 0 5px #ef4444,
      0 0 10px #ef4444,
      0 0 20px #ef4444;
  }
}

.animate-glow {
  animation: glow 2.5s ease-in-out infinite;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
