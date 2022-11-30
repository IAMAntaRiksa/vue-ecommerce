import { createRouter, createWebHistory } from 'vue-router'
import store from '../stores'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../views/home/Index.vue"),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("../views/auth/Register.vue"),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("../views/auth/Login.vue"),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import("../views/category/Index.vue"),
    },
    {
      path: '/category/:slug',
      name: 'detail_category',
      component: () => import('../views/category/Show.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import("../views/category/Index.vue"),
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/product/Index.vue'),
      //chek is loggedIn
      meta: {
        requiresAuth: true
      }
    },
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //cek nilai dari getters isLoggedIn di module auth
    if (store.getters['auth/isLoggedIn']) {
      next()
      return
    }
    next('/login')
  } else next()

})
export default router
