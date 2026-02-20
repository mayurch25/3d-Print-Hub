<template>
  <div>Products for : {{ id }}</div>
</template>

<script setup>
definePageMeta({
  layout: "products",
});
const { id } = useRoute().params;
</script>
