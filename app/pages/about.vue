<template>
  <div
    class="h-screen flex items-center justify-center bg-[#0b1120] relative overflow-hidden px-6"
  >
    <!-- Background Glow -->
    <div
      class="absolute w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[150px]"
    ></div>

    <!-- Content -->
    <div class="relative max-w-2xl text-center text-gray-100">
      <h1
        class="text-4xl md:text-6xl font-extrabold tracking-wider text-gray-200 animate-glow mb-6"
      >
        About Us
      </h1>

      <p class="text-gray-300 text-lg leading-relaxed">
        We are a new team in the 3D printing market, focused on bringing
        high‑quality, affordable 3D printed products to your home, office, and
        everyday life. From custom lamps and kids toys to practical kitchen
        accessories, we print with care so you receive clean, precise and
        reliable parts.
      </p>

      <p class="text-gray-400 text-sm mt-4">
        Our goal is simple: combine creativity and technology to deliver the
        best possible 3D printed experience for you.
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
</script>
