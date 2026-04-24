<template>
  <div
    class="h-screen flex items-center justify-center bg-[#0b1120] relative overflow-hidden px-6"
  >
    <!-- Background Glow -->
    <div
      class="absolute w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[150px]"
    ></div>

    <!-- Content -->
    <div
      class="relative max-w-xl w-full bg-black/20 border border-red-500/30 rounded-2xl p-8 shadow-xl text-gray-100"
    >
      <h1 class="text-3xl md:text-4xl font-bold mb-4 text-center">
        Contact Us
      </h1>
      <p class="text-gray-300 text-sm mb-6 text-center">
        Reach out to us directly for orders, custom 3D print ideas, or any
        questions.
      </p>

      <div class="space-y-4 text-sm md:text-base">
        <div>
          <p class="font-semibold text-red-400">Mayur Chaudhari</p>
          <a
            href="tel:+919421674880"
            class="text-gray-200 hover:text-red-400 transition"
          >
            +91 94216 74880
          </a>
        </div>

        <div>
          <p class="font-semibold text-red-400">Sonam Chaudhari</p>
          <a
            href="tel:+917879645914"
            class="text-gray-200 hover:text-red-400 transition"
          >
            +91 78796 45914
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
</script>
