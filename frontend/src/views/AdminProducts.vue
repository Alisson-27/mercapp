<script setup>
import { ref, onMounted } from 'vue'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/api'

const products = ref([])

const form = ref({
  id: null,
  nombre: '',
  precio: 0
})

// 📦 cargar productos
const loadProducts = async () => {
  const res = await getProducts()
  products.value = res.data
}

onMounted(loadProducts)

// ➕ guardar (crear o editar)
const saveProduct = async () => {
  if (form.value.id) {
    await updateProduct(form.value.id, form.value)
  } else {
    await createProduct(form.value)
  }

  form.value = { id: null, nombre: '', precio: 0 }
  loadProducts()
}

// ✏️ editar
const editProduct = (p) => {
  form.value = { ...p }
}

// ❌ eliminar
const removeProduct = async (id) => {
  await deleteProduct(id)
  loadProducts()
}
</script>

<template>
  <div>
    <h1>🛠 Admin Productos</h1>

    <!-- FORMULARIO -->
    <div class="form">
      <input v-model="form.nombre" placeholder="Nombre" />
      <input v-model="form.precio" type="number" placeholder="Precio" />

      <button @click="saveProduct">
        {{ form.id ? 'Actualizar' : 'Crear' }}
      </button>
    </div>

    <hr />

    <!-- LISTA -->
    <div v-for="p in products" :key="p.id">
      <h3>{{ p.nombre }}</h3>
      <p>${{ p.precio }}</p>

      <button @click="editProduct(p)">Editar</button>
      <button @click="removeProduct(p.id)">Eliminar</button>
    </div>
  </div>
</template>