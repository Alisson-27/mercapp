<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const product = ref(null)

onMounted(async () => {
  const res = await api.get(`/productos`)
  product.value = res.data.find(p => p.id == route.params.id)
})
</script>

<template>
  <div v-if="product">
    <h1>{{ product.nombre }}</h1>
    <p>Precio: ${{ product.precio }}</p>

    <button>
      Agregar al carrito
    </button>
  </div>
</template>