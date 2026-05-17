<script setup>
import { ref } from 'vue'

const cart = ref(JSON.parse(localStorage.getItem("cart")) || [])

function remove(index) {
  cart.value.splice(index, 1)
  localStorage.setItem("cart", JSON.stringify(cart.value))
}

const total = () =>
  cart.value.reduce((sum, p) => sum + p.precio, 0)
</script>

<template>
  <div>
    <h1>🛒 Carrito</h1>

    <div v-for="(item, i) in cart" :key="i">
      {{ item.nombre }} - ${{ item.precio }}
      <button @click="remove(i)">Eliminar</button>
    </div>

    <h3>Total: ${{ total() }}</h3>
  </div>
</template>