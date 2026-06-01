import { ref, onMounted } from 'vue'
import api from '../services/api'

export function useCategories() {
  const categories = ref([])

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categorias')
      categories.value = res.data
    } catch (err) {
      console.error('Error categorias', err)
    }
  }

  onMounted(fetchCategories)

  return { categories }
}
