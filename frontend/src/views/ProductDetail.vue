<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProduct } from '../services/api'

const route = useRoute()
const product = ref(null)
const error = ref('')

onMounted(async () => {
  try {
    const response = await getProduct(route.params.id)
    product.value = response.data
  } catch (_err) {
    error.value = 'Producto no encontrado.'
  }
})
</script>

<template>
  <main class="detail">
    <p v-if="error" class="error">{{ error }}</p>

    <article v-else-if="product" class="card">
      <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.nombre" class="product-img" />
      <h1>{{ product.nombre }}</h1>
      <p>Precio: ${{ product.precio }}</p>
    </article>
  </main>
</template>
