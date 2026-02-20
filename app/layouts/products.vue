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
