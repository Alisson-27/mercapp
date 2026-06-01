<script setup>
import { ref, onMounted } from 'vue'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/api'

const products = ref([])
const error = ref('')

const emptyForm = {
  id: null,
  nombre: '',
  precio: 0,
  categoryId: 1,
  imageUrl: ''
}

const form = ref({ ...emptyForm })

const loadProducts = async () => {
  const response = await getProducts()
  products.value = response.data
}

onMounted(loadProducts)

const saveProduct = async () => {
  try {
    error.value = ''

    if (form.value.id) {
      await updateProduct(form.value.id, form.value)
    } else {
      await createProduct(form.value)
    }

    form.value = { ...emptyForm }
    await loadProducts()
  } catch (_err) {
    error.value = 'No se pudo guardar el producto.'
  }
}

const editProduct = (product) => {
  form.value = { ...product }
}

const removeProduct = async (id) => {
  await deleteProduct(id)
  await loadProducts()
}
</script>

<template>
  <main class="admin">
    <h1>Admin Productos</h1>

    <section class="form">
      <input v-model="form.nombre" placeholder="Nombre" />
      <input v-model.number="form.precio" type="number" min="0" placeholder="Precio" />
      <input v-model.number="form.categoryId" type="number" min="1" max="3" placeholder="Categoria" />
      <input v-model="form.imageUrl" placeholder="URL de imagen" />

      <button @click="saveProduct">
        {{ form.id ? 'Actualizar' : 'Crear' }}
      </button>
    </section>

    <p v-if="error" class="error">{{ error }}</p>

    <section class="admin-list">
      <article v-for="product in products" :key="product.id" class="admin-item">
        <div>
          <h3>{{ product.nombre }}</h3>
          <p>${{ product.precio }}</p>
        </div>

        <div class="actions">
          <button @click="editProduct(product)">Editar</button>
          <button @click="removeProduct(product.id)">Eliminar</button>
        </div>
      </article>
    </section>
  </main>
</template>
