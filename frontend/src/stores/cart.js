import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  function addToCart(product) {
    const existing = items.value.find(p => p.id === product.id)

    if (existing) {
      existing.qty++
    } else {
      items.value.push({ ...product, qty: 1 })
    }

    save()
  }

  function removeFromCart(id) {
    items.value = items.value.filter(p => p.id !== id)
    save()
  }

  function clearCart() {
    items.value = []
    save()
  }

  const total = computed(() => {
    return items.value.reduce((sum, p) => {
      return sum + p.precio * p.qty
    }, 0)
  })

  function save() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  function load() {
    const data = localStorage.getItem('cart')
    if (data) {
      items.value = JSON.parse(data)
    }
  }

  load()

  return {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    total
  }
})