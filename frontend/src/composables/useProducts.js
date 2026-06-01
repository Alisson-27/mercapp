import { ref, onMounted } from 'vue'
import api from '../services/api'

export function useProducts() {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = async () => {
    loading.value = true

    try {
      const response = await api.get('/productos')
      products.value = response.data
    } catch (err) {
      error.value = 'Error cargando productos'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchProducts)

  return {
    products,
    loading,
    error
  }
}
