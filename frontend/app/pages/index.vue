<script setup>
const { isLoggedIn, isAdmin } = useAuth()

const inquiryLink = computed(() => isLoggedIn.value && !isAdmin.value ? '/inquiry' : '/auth/login')
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center bg-[#0b1120] relative overflow-hidden px-6">
      <div class="absolute w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[150px] -top-32 -left-32"></div>
      <div class="absolute w-[400px] h-[400px] bg-red-800/10 rounded-full blur-[100px] bottom-0 right-0"></div>

      <div class="relative text-center max-w-4xl z-10 py-32">
        <span class="inline-block text-red-500 tracking-[4px] text-xs uppercase mb-6 border border-red-500/30 px-4 py-1.5 rounded-full">
          SM 3D Print Hub
        </span>
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-100 leading-tight mt-4">
          Precision 3D Printing<br class="hidden md:block" />
          <span class="text-red-500">For Every Idea</span>
        </h1>
        <p class="mt-6 text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
          Browse our catalog of ready-made 3D printed products — crafted with precision and passion. See something you love? Send us an inquiry.
        </p>
        <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/products"
            class="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition shadow-lg shadow-red-600/30"
          >
            Browse Products
          </NuxtLink>
          <NuxtLink
            :to="inquiryLink"
            class="px-8 py-3.5 border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition font-semibold"
          >
            Send an Inquiry
          </NuxtLink>
        </div>

        <!-- Stats Row -->
        <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <p class="text-3xl font-bold text-red-500">500+</p>
            <p class="text-gray-500 text-sm mt-1">Projects Completed</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-red-500">99%</p>
            <p class="text-gray-500 text-sm mt-1">Client Satisfaction</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-red-500">0.1mm</p>
            <p class="text-gray-500 text-sm mt-1">Print Precision</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-red-500">24hr</p>
            <p class="text-gray-500 text-sm mt-1">Fast Turnaround</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why 3D Printing Section -->
    <section class="py-24 bg-[#020617] px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <span class="text-red-500 text-xs uppercase tracking-[4px]">The Future is Now</span>
          <h2 class="text-4xl font-bold text-gray-100 mt-3">Why 3D Printing Matters</h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">
            3D printing is revolutionizing industries by enabling faster, cheaper, and more customized production than ever before.
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-[#0b1120] border border-white/5 rounded-2xl p-8 hover:border-red-500/30 transition group">
            <div class="h-12 w-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition">
              <svg class="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="text-gray-100 font-semibold text-xl mb-3">Rapid Prototyping</h3>
            <p class="text-gray-500 leading-relaxed">Turn concepts into physical prototypes within hours instead of weeks. Iterate quickly and bring ideas to life faster than ever.</p>
          </div>

          <div class="bg-[#0b1120] border border-white/5 rounded-2xl p-8 hover:border-red-500/30 transition group">
            <div class="h-12 w-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition">
              <svg class="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
              </svg>
            </div>
            <h3 class="text-gray-100 font-semibold text-xl mb-3">Full Customization</h3>
            <p class="text-gray-500 leading-relaxed">Every print is tailored exactly to your specifications. No minimum orders, no compromises — just your vision, realized.</p>
          </div>

          <div class="bg-[#0b1120] border border-white/5 rounded-2xl p-8 hover:border-red-500/30 transition group">
            <div class="h-12 w-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition">
              <svg class="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <h3 class="text-gray-100 font-semibold text-xl mb-3">Complex Geometries</h3>
            <p class="text-gray-500 leading-relaxed">Create intricate designs impossible with traditional manufacturing — internal cavities, organic shapes, and interlocking parts.</p>
          </div>

          <div class="bg-[#0b1120] border border-white/5 rounded-2xl p-8 hover:border-red-500/30 transition group">
            <div class="h-12 w-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition">
              <svg class="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-gray-100 font-semibold text-xl mb-3">Cost-Effective</h3>
            <p class="text-gray-500 leading-relaxed">Reduce waste and tooling costs significantly. 3D printing uses only the material needed, making small production runs economical.</p>
          </div>

          <div class="bg-[#0b1120] border border-white/5 rounded-2xl p-8 hover:border-red-500/30 transition group">
            <div class="h-12 w-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition">
              <svg class="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-gray-100 font-semibold text-xl mb-3">Eco-Friendly</h3>
            <p class="text-gray-500 leading-relaxed">Additive manufacturing generates far less waste than subtractive methods. Sustainable materials available for greener production.</p>
          </div>

          <div class="bg-[#0b1120] border border-white/5 rounded-2xl p-8 hover:border-red-500/30 transition group">
            <div class="h-12 w-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition">
              <svg class="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
              </svg>
            </div>
            <h3 class="text-gray-100 font-semibold text-xl mb-3">Production Ready</h3>
            <p class="text-gray-500 leading-relaxed">Used in aerospace, medical, automotive, and consumer industries for real end-use parts — not just prototypes.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Qualities Section -->
    <section class="py-24 bg-[#0b1120] px-6 relative overflow-hidden">
      <div class="absolute w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[120px] right-0 top-0"></div>
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-16">
          <span class="text-red-500 text-xs uppercase tracking-[4px]">What Sets Us Apart</span>
          <h2 class="text-4xl font-bold text-gray-100 mt-3">Our Print Qualities</h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">
            Every piece we print meets the highest standards of precision, durability, and finish quality.
          </p>
        </div>
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Quality list -->
          <div class="space-y-7">
            <div class="flex gap-5 items-start">
              <div class="flex-shrink-0 h-10 w-10 bg-red-500/10 rounded-lg flex items-center justify-center mt-1">
                <svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h4 class="text-gray-200 font-semibold text-lg">High Resolution Printing</h4>
                <p class="text-gray-500 mt-1">Layer resolution as fine as 0.1mm ensures smooth surfaces and sharp detail on every print.</p>
              </div>
            </div>
            <div class="flex gap-5 items-start">
              <div class="flex-shrink-0 h-10 w-10 bg-red-500/10 rounded-lg flex items-center justify-center mt-1">
                <svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h4 class="text-gray-200 font-semibold text-lg">Premium Material Range</h4>
                <p class="text-gray-500 mt-1">PLA, ABS, PETG, TPU, and specialty filaments — matched to your strength, flexibility, and finish requirements.</p>
              </div>
            </div>
            <div class="flex gap-5 items-start">
              <div class="flex-shrink-0 h-10 w-10 bg-red-500/10 rounded-lg flex items-center justify-center mt-1">
                <svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h4 class="text-gray-200 font-semibold text-lg">Fast Turnaround Time</h4>
                <p class="text-gray-500 mt-1">Most orders fulfilled within 24–72 hours. Rush options available for time-critical projects.</p>
              </div>
            </div>
            <div class="flex gap-5 items-start">
              <div class="flex-shrink-0 h-10 w-10 bg-red-500/10 rounded-lg flex items-center justify-center mt-1">
                <svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h4 class="text-gray-200 font-semibold text-lg">Post-Processing & Finishing</h4>
                <p class="text-gray-500 mt-1">Sanding, painting, and surface treatment options available for a professional end-use appearance.</p>
              </div>
            </div>
            <div class="flex gap-5 items-start">
              <div class="flex-shrink-0 h-10 w-10 bg-red-500/10 rounded-lg flex items-center justify-center mt-1">
                <svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h4 class="text-gray-200 font-semibold text-lg">Custom Sizes & Scales</h4>
                <p class="text-gray-500 mt-1">From tiny intricate parts to large-format pieces — we scale to meet your exact dimensional requirements.</p>
              </div>
            </div>
          </div>

          <!-- Print type cards -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-[#020617] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:border-red-500/20 transition">
              <svg class="h-10 w-10 text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              <p class="text-gray-200 font-medium text-sm">FDM Printing</p>
              <p class="text-gray-600 text-xs mt-1">Strong & versatile</p>
            </div>
            <div class="bg-[#020617] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:border-red-500/20 transition">
              <svg class="h-10 w-10 text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <p class="text-gray-200 font-medium text-sm">Resin Printing</p>
              <p class="text-gray-600 text-xs mt-1">Ultra fine detail</p>
            </div>
            <div class="bg-[#020617] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:border-red-500/20 transition">
              <svg class="h-10 w-10 text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
              </svg>
              <p class="text-gray-200 font-medium text-sm">Color Printing</p>
              <p class="text-gray-600 text-xs mt-1">Multi-color options</p>
            </div>
            <div class="bg-[#020617] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:border-red-500/20 transition">
              <svg class="h-10 w-10 text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
              </svg>
              <p class="text-gray-200 font-medium text-sm">Flexible Parts</p>
              <p class="text-gray-600 text-xs mt-1">TPU & rubber-like</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-24 bg-[#020617] px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <span class="text-red-500 text-xs uppercase tracking-[4px]">Simple Process</span>
          <h2 class="text-4xl font-bold text-gray-100 mt-3">How to Order</h2>
          <p class="text-gray-500 mt-4 max-w-xl mx-auto">Three easy steps to get our printed products delivered to you.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="text-center">
            <div class="h-16 w-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-5 text-red-500 text-xl font-bold">1</div>
            <h4 class="text-gray-200 font-semibold mb-2">Browse Our Catalog</h4>
            <p class="text-gray-500 text-sm">Explore our ready-made 3D printed products — from home decor to functional parts.</p>
          </div>
          <div class="text-center">
            <div class="h-16 w-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-5 text-red-500 text-xl font-bold">2</div>
            <h4 class="text-gray-200 font-semibold mb-2">Send an Inquiry</h4>
            <p class="text-gray-500 text-sm">Found something you like? Fill in a quick inquiry form and we'll get back to you promptly.</p>
          </div>
          <div class="text-center">
            <div class="h-16 w-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-5 text-red-500 text-xl font-bold">3</div>
            <h4 class="text-gray-200 font-semibold mb-2">Receive Your Print</h4>
            <p class="text-gray-500 text-sm">We confirm your order and deliver the product — packaged carefully to your doorstep.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-[#0b1120] px-6 relative overflow-hidden">
      <div class="absolute inset-0 bg-red-600/5"></div>
      <div class="absolute w-[500px] h-[300px] bg-red-600/20 rounded-full blur-[120px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></div>
      <div class="relative max-w-3xl mx-auto text-center z-10">
        <h2 class="text-4xl font-bold text-gray-100">See Something You Like?</h2>
        <p class="text-gray-400 mt-4 text-lg">Browse our catalog of precision 3D prints and send us an inquiry — we'll get back to you right away.</p>
        <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/products"
            class="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition shadow-lg shadow-red-600/30"
          >
            Browse Products
          </NuxtLink>
          <NuxtLink
            :to="inquiryLink"
            class="px-8 py-3.5 border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition font-semibold"
          >
            Send Inquiry
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
