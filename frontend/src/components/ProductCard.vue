<template>
  <div class="card">
    <h3>{{ product.nombre }}</h3>
    <p>${{ product.precio }}</p>

    <button @click="goToDetail">
      Ver detalle
    </button>

    <button @click="addToCart">
      Agregar
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const props = defineProps({ product: Object })
const router = useRouter()
const cart = useCartStore()

function goToDetail() {
  router.push(`/product/${props.product.id}`)
}

function addToCart() {
  cart.addToCart(props.product)
}
</script>