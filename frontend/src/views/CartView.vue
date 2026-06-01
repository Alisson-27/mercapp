<script setup>
import { ref, computed } from 'vue'

const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])

function remove(index) {
  cart.value.splice(index, 1)
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const total = computed(() =>
  cart.value.reduce((sum, product) => sum + Number(product.precio), 0)
)
</script>

<template>
  <main class="cart-page">
    <h1>Carrito</h1>

    <p v-if="cart.length === 0">El carrito esta vacio</p>

    <div v-for="(item, index) in cart" :key="`${item.id}-${index}`" class="cart-item">
      <span>{{ item.nombre }} - ${{ item.precio }}</span>
      <button @click="remove(index)">Eliminar</button>
    </div>

    <h3>Total: ${{ total }}</h3>
  </main>
</template>
