<template>
  <div
    class="h-screen flex items-center justify-center bg-[#0b1120] relative overflow-hidden"
  >
    <!-- Background Glow -->
    <div
      class="absolute w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[150px]"
    ></div>

    <!-- Content -->
    <div class="relative text-center">
      <h1
        class="text-5xl md:text-7xl font-extrabold tracking-wider text-gray-200 animate-glow"
      >
        About US
      </h1>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
</script>
