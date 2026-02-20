<script setup>
definePageMeta({
  layout: "default",
});

const products = [
  {
    id: 1,
    name: "3D Printed Night Lamp",
    shortDescription:
      "Ambient table lamp with a custom 3D printed shade, perfect for bedrooms and living rooms.",
    description:
      "A soft‑glow LED lamp with a fully 3D printed shade. The patterned shell casts beautiful shadows on the wall and is ideal for bedside tables, desks, or cozy corners.",
    image: "/assets/images/SM3dPrints.png",
  },
  {
    id: 2,
    name: "Kids 3D Printed Toy Car",
    shortDescription:
      "Colorful and durable toy car made with child‑safe 3D printing materials.",
    description:
      "A fun, lightweight toy car printed in bright colors. Designed with smooth edges for kids and great for gifting or personal collections.",
    image: "/assets/images/SM3dPrints.png",
  },
  {
    id: 3,
    name: "Kitchen Spoon & Tool Holder",
    shortDescription:
      "Practical 3D printed organizer to keep your kitchen spoons and tools in one place.",
    description:
      "A sturdy, heat‑resistant tool holder that keeps your frequently used spoons, spatulas, and whisks upright and organized next to your stove.",
    image: "/assets/images/SM3dPrints.png",
  },
  {
    id: 4,
    name: "Phone Stand / Dock",
    shortDescription:
      "Compact 3D printed stand for smartphones, perfect for desks and bedside tables.",
    description:
      "A minimal, stable stand that holds your phone at a comfortable viewing angle for video calls, movies, or charging at night.",
    image: "/assets/images/SM3dPrints.png",
  },
  {
    id: 5,
    name: "Geometric Planter Pot",
    shortDescription:
      "Modern 3D printed planter ideal for small indoor plants and succulents.",
    description:
      "A stylish geometric pot that brings a modern touch to your desk or window. Perfect for succulents, cacti, or small indoor plants.",
    image: "/assets/images/SM3dPrints.png",
  },
  {
    id: 6,
    name: "Wall Art Name Plate",
    shortDescription:
      "Customized 3D printed name plate or quote for your wall or door.",
    description:
      "A fully customizable 3D printed name plate or quote sign that you can hang on walls, doors, or shelves to personalize your space.",
    image: "/assets/images/SM3dPrints.png",
  },
];
</script>

<template>
  <section class="bg-[#020617] min-h-screen py-16">
    <div class="max-w-7xl mx-auto px-6">
      <header class="mb-10 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-100 mb-3">
          3D Printed Products Showcase
        </h1>
        <p class="text-gray-400 max-w-2xl mx-auto">
          A quick look at some real‑life 3D printed items we can create for your
          home, kids, workspace, and kitchen.
        </p>
      </header>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="product in products"
          :key="product.id"
          class="bg-[#0b1120] border border-white/10 rounded-2xl overflow-hidden shadow-xl shadow-black/40 flex flex-col transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/30 hover:scale-[1.02]"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="h-48 w-full object-cover"
          />

          <div class="p-5 flex flex-col flex-1">
            <h2 class="text-xl font-semibold text-gray-100 mb-2">
              {{ product.name }}
            </h2>
            <p class="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
              {{ product.shortDescription }}
            </p>

            <div class="mt-auto flex justify-between items-center">
              <span class="text-xs uppercase tracking-wide text-gray-500">
                ID: {{ product.id }}
              </span>

              <NuxtLink
                :to="`/products/${product.id}`"
                class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
              >
                View details
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
