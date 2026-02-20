<script setup lang="ts">
import Footer from "~/components/layout/Footer.vue";
import Navbar from "~/components/layout/Navbar.vue";
</script>

<template>
  <div>
    <header>
      <Navbar />
    </header>

    <!-- Output the page content -->
    <div>
      <slot />
    </div>

    <!-- footer -->
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #e9785c;
}
</style>
