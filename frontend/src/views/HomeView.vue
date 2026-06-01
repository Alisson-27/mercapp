<script setup>
import { ref, computed, onMounted } from 'vue'
import { getProducts, getCategories } from '../services/api'

const products = ref([])
const categories = ref([])
const search = ref('')
const selectedCategory = ref('')
const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      getProducts(),
      getCategories()
    ])

    products.value = productsResponse.data
    categories.value = categoriesResponse.data
  } catch (_err) {
    error.value = 'No se pudieron cargar los productos. Revisa que el backend este activo.'
  } finally {
    loading.value = false
  }
})

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

function addToCart(product) {
  cart.value.push(product)
  saveCart()
}

function removeFromCart(index) {
  cart.value.splice(index, 1)
  saveCart()
}

function checkout() {
  alert('Pago realizado')
  cart.value = []
  localStorage.removeItem('cart')
}

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchSearch = product.nombre
      .toLowerCase()
      .includes(search.value.toLowerCase())

    const matchCategory =
      selectedCategory.value === '' ||
      product.categoryId == selectedCategory.value

    return matchSearch && matchCategory
  })
})

const total = computed(() =>
  cart.value.reduce((sum, product) => sum + Number(product.precio), 0)
)
</script>

<template>
  <main class="container">
    <section class="toolbar">
      <h1>MercApp</h1>

      <div class="filters">
        <input v-model="search" placeholder="Buscar productos..." />

        <select v-model="selectedCategory">
          <option value="">Todas las categorias</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
    </section>

    <p v-if="loading">Cargando productos...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <section v-else class="products">
      <article v-for="product in filteredProducts" :key="product.id" class="card">
        <img :src="product.imageUrl" :alt="product.nombre" class="product-img" />

        <h3>{{ product.nombre }}</h3>
        <p>${{ product.precio }}</p>

        <button @click="addToCart(product)">
          Agregar al carrito
        </button>
      </article>
    </section>

    <section class="cart">
      <h2>Carrito</h2>

      <p v-if="cart.length === 0">
        El carrito esta vacio
      </p>

      <div v-for="(item, index) in cart" :key="`${item.id}-${index}`" class="cart-item">
        <span>{{ item.nombre }} - ${{ item.precio }}</span>
        <button @click="removeFromCart(index)">Eliminar</button>
      </div>

      <h3>Total: ${{ total }}</h3>

      <button v-if="cart.length > 0" @click="checkout">
        Pagar
      </button>
    </section>
  </main>
</template>
