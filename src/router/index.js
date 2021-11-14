import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'
import Registration from '../components/Register'
import EditProduct from "../components/EditProduct";
import AddProduct from "../components/AddProduct";
import Cart from "../components/Cart";
import Product from "../components/Product";

const requireAuth = (to, from, next) => {
  let token = localStorage.getItem('token')
  if (!token) {
    next({name: 'Login'})
  } else {
    next()
  }
}
const requireAuthAdmin = (to, from, next) => {
  let token = localStorage.getItem('token')
  if (!token) {
    next({name: 'Login'})
  } else {
    let user = JSON.parse(localStorage.getItem('user'))
    if(user.role === 'SHOP') {
      next()
    }
  }
}
const requireAuthUser = (to, from, next) => {
  let token = localStorage.getItem('token')
  if (!token) {
    next({name: 'Login'})
  } else {
    let user = JSON.parse(localStorage.getItem('user'))
    if(user.role === 'USER') {
      next()
    }
  }
}
const requireNotAuth = (to, from, next) => {
  let token = localStorage.getItem('token')
  if (token) {
    next({name: 'Home'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: requireNotAuth
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
    beforeEnter: requireNotAuth
  },
  {
    path: '/edit-product/:id',
    name: 'EditProduct',
    component: EditProduct,
    props: true,
    beforeEnter: requireAuthAdmin
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct,
    beforeEnter: requireAuthAdmin
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: requireAuthUser
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
    props: true,
    beforeEnter: requireAuthUser
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
