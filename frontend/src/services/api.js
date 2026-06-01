import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
})

export const getProducts = () => api.get('/productos')
export const getProduct = (id) => api.get(`/productos/${id}`)
export const createProduct = (data) => api.post('/productos', data)
export const updateProduct = (id, data) => api.put(`/productos/${id}`, data)
export const deleteProduct = (id) => api.delete(`/productos/${id}`)
export const getCategories = () => api.get('/categorias')

export default api
