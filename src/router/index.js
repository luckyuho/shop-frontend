import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Oauth from '@/components/Oauth'
import Redirect from '@/components/Redirect'
import Products from '@/components/Products'
import Product from '@/components/Product'

import { checkIfUserIsAuthenticated } from '@/directive/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Products',
      component: Products,
      meta: {
        requiresAuth: true // 設置需要驗證的頁面
      }
    },
    {
      path: '/product',
      name: 'Product',
      component: Product,
      meta: {
        requiresAuth: true // 設置需要驗證的頁面
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/oauth',
      name: 'Oauth',
      component: Oauth
    },
    {
      path: '/redirect',
      name: 'Redirect',
      component: Redirect
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 檢查是否存在cookie
    const result = checkIfUserIsAuthenticated()
    console.log('result:', result)
    if (result) {
      // 如果有cookie，允許訪問該頁面
      console.log('have cookie')
      next()
    } else {
      // 如果沒有cookie，導向登入頁
      console.log('no cookie')
      next('/login')
    }
  } else {
    console.log('others')
    // 不需要驗證的頁面，直接訪問
    next()
  }
})

export default router
