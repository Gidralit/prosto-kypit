import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { name: 'register', path: '/register', component: () => import('@/views/RegisterForm.vue')},
    { name: 'login', path: '/login', component: () => import('@/views/LoginForm.vue')},
    { name: 'catalog', path: '/', component: () => import('@/views/ProductCatalog.vue')},
    { name: 'basket', path: '/basket', component: () => import('@/views/BasketItems.vue')},
    { name: 'orders', path: '/orders', component: () => import('@/views/OrdersItems.vue')},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
