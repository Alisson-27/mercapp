import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export const getProducts = () => api.get('/productos')
export const createProduct = (data) => api.post('/productos', data)
export const updateProduct = (id, data) => api.put(`/productos/${id}`, data)
export const deleteProduct = (id) => api.delete(`/productos/${id}`)