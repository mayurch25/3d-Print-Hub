<template>
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

      <!-- CTA Buttons -->
      <div class="mt-8 flex flex-col md:flex-row gap-4 justify-center">
        <button
          class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
        >
          Notify Me
        </button>

        <button
          class="px-6 py-3 border border-gray-500 text-gray-300 hover:bg-gray-800 rounded-lg transition"
        >
          Explore Soon
        </button>
      </div>

      <!-- Email Input -->
      <div class="mt-8">
        <input
          type="email"
          placeholder="Enter your email"
          class="px-4 py-3 w-full md:w-96 rounded-lg bg-gray-900 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
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
</style>
