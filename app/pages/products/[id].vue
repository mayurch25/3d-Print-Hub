<script setup>
definePageMeta({
  layout: "products",
});

const products = [
  {
    id: 1,
    name: "3D Printed Night Lamp",
    description:
      "Ambient table lamp with a custom 3D printed shade, perfect for bedrooms and living rooms.\n\nThe patterned shell casts soft, artistic shadows and can be customized with different patterns and colors.",
    image: "/assets/images/nightlamp.png",
  },
  {
    id: 2,
    name: "Kids 3D Printed Toy Car",
    description:
      "Colorful and durable 3D printed toy car designed especially for children.\n\nPrinted with smooth edges and strong material, perfect for everyday play.",
    image: "/assets/images/3dprintedToycar.png",
  },
  {
    id: 3,
    name: "Kitchen Spoon & Tool Holder",
    description:
      "A practical 3D printed organizer that keeps your spoons and kitchen tools upright and within easy reach.\n\nHelps keep your countertop clean and your most‑used tools ready to grab.",
    image: "/assets/images/kitchensppnholder.png",
  },
  {
    id: 4,
    name: "Phone Stand / Dock",
    description:
      "Compact, stable stand for your smartphone, ideal for desks, workspaces, or bedside tables.\n\nGreat for video calls, watching content, or keeping your phone visible while charging.",
    image: "/assets/images/phoneholder.png",
  },
  {
    id: 5,
    name: "Geometric Planter Pot",
    description:
      "Modern geometric planter for small indoor plants and succulents.\n\nAdds a clean, designer look to work desks, shelves, and window sills.",
    image: "/assets/images/3dprintgeomatricplanter.png",
  },
  {
    id: 6,
    name: "Wall Art Name Plate",
    description:
      "Custom 3D printed name plate or quote sign, perfect for doors, kids rooms, or office spaces.\n\nYou can choose your own text, font style, and basic color theme.",
    image: "/assets/images/wallart.png",
  },
];

const route = useRoute();
const id = computed(() => Number(route.params.id));
const product = computed(() => products.find((item) => item.id === id.value));

const onImageError = (event) => {
  const img = event.target;
  if (img && !img.dataset.fallbackUsed) {
    img.src = "/assets/images/SM3dPrints.png";
    img.dataset.fallbackUsed = "true";
  }
};
</script>

<template>
  <section class="bg-[#020617] min-h-screen py-16">
    <div class="max-w-5xl mx-auto px-6">
      <NuxtLink
        to="/products"
        class="inline-flex items-center text-sm text-gray-400 hover:text-red-400 mb-6"
      >
        ← Back to products
      </NuxtLink>

      <div
        v-if="product"
        class="bg-[#0b1120] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 md:flex"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full md:w-1/2 h-72 md:h-auto object-cover"
          @error="onImageError"
        />

        <div class="p-6 md:p-8 flex-1">
          <p class="text-xs uppercase tracking-wide text-gray-500 mb-2">
            Product ID: {{ product.id }}
          </p>
          <h1 class="text-2xl md:text-3xl font-semibold text-gray-100 mb-4">
            {{ product.name }}
          </h1>
          <p class="whitespace-pre-line text-gray-300 leading-relaxed mb-6">
            {{ product.description }}
          </p>

          <button
            class="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
          >
            Request this print
          </button>
        </div>
      </div>

      <div
        v-else
        class="bg-[#0b1120] border border-red-500/40 text-red-300 rounded-xl p-6 mt-6"
      >
        <h2 class="text-lg font-semibold mb-2">Product not found</h2>
        <p class="text-sm text-gray-400">
          We couldn't find a product with ID
          <span class="font-mono text-gray-200">{{ route.params.id }}</span
          >.
        </p>
      </div>
    </div>
  </section>
</template>
