<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])
const categories = ref([])
const search = ref('')
const selectedCategory = ref('')
const cart = ref(JSON.parse(localStorage.getItem("cart")) || [])

/* =========================
   LOAD DATA
========================= */
onMounted(async () => {
  const resP = await axios.get('http://localhost:3000/productos')
  products.value = resP.data

  const resC = await axios.get('http://localhost:3000/categorias')
  categories.value = resC.data

  console.log("PRODUCTOS:", resP.data)
  console.log("CATEGORIAS:", resC.data)
})

/* =========================
   CART
========================= */
function addToCart(product) {
  cart.value.push(product)
  localStorage.setItem("cart", JSON.stringify(cart.value))
}

function removeFromCart(index) {
  cart.value.splice(index, 1)
  localStorage.setItem("cart", JSON.stringify(cart.value))
}

function checkout() {
  alert("Pago realizado 💰")
  cart.value = []
  localStorage.removeItem("cart")
}

/* =========================
   FILTER
========================= */
const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchSearch = p.nombre
      .toLowerCase()
      .includes(search.value.toLowerCase())

    const matchCategory =
      selectedCategory.value === '' ||
      p.categoryId == selectedCategory.value

    return matchSearch && matchCategory
  })
})

/* TOTAL */
const total = computed(() =>
  cart.value.reduce((sum, p) => sum + p.precio, 0)
)
</script>

<template>
  <div class="container">

    <h1>🛒 MercApp</h1>

    <!-- SEARCH -->
    <input v-model="search" placeholder="Buscar productos..." />

    <!-- CATEGORY -->
    <select v-model="selectedCategory">
      <option value="">Todas las categorías</option>
      <option v-for="c in categories" :key="c.id" :value="c.id">
        {{ c.name }}
      </option>
    </select>

    <hr />

    <!-- PRODUCTS -->
   <div v-for="p in filteredProducts" :key="p.id" class="card">

  <img
    :src="p.imageUrl"
    alt="producto"
    class="product-img"
  />

  <h3>{{ p.nombre }}</h3>
  <p>${{ p.precio }}</p>

  <button @click="addToCart(p)">
    Agregar al carrito
  </button>

</div>

    <hr />

    <!-- CART -->
    <h2>Carrito 🛒</h2>

    <div v-if="cart.length === 0">
      El carrito está vacío
    </div>

    <div v-for="(item, i) in cart" :key="i" class="card">
      {{ item.nombre }} - ${{ item.precio }}
      <button @click="removeFromCart(i)">Eliminar</button>
    </div>

    <h3>Total: ${{ total }}</h3>

    <button v-if="cart.length > 0" @click="checkout">
      Pagar 💰
    </button>

  </div>
</template>

<style>
.container {
  padding: 20px;
  font-family: Arial;
  background: #0f172a;
  min-height: 100vh;
  color: white;
}

.card {
  background: #111827;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border-radius: 12px;
  max-width: 300px;
}

.product-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

input, select {
  padding: 8px;
  margin: 5px;
  border-radius: 6px;
  border: none;
}
</style>