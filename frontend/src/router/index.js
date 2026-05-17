import { createRouter, createWebHistory } from 'vue-router'

// Vistas (lazy loading recomendado para la rúbrica)
const HomeView = () => import('../views/HomeView.vue')
const ProductDetail = () => import('../views/ProductDetail.vue')
const CartView = () => import('../views/CartView.vue')
const AboutView = () => import('../views/AboutView.vue')
const NotFound = () => import('../views/NotFound.vue')
const AdminProducts = () => import('../views/AdminProducts.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
    path: '/admin',
      component: AdminProducts
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetail
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

export default router