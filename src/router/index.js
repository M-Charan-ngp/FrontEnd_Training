import { createRouter, createWebHistory } from 'vue-router'
import UserView from '@/views/UserView.vue'
import StudentCreate from '@/views/StudentCreate.vue'
import CounterView from '@/views/CounterView.vue'
import viewStudent from '@/views/viewStudent.vue'
import LoginPage from '@/views/LoginPage.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import { authMiddleware, adminMiddleware } from '../middlewares/middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', 
      name: 'Users',
      component: UserView,
      beforeEnter: [authMiddleware]
    },
    {
      path: '/counter', 
      name: 'Counters',
      component: CounterView,
      beforeEnter: [authMiddleware]
    },
    {
      path: '/student-form/:id?',
      name:'StudentForm',
      component: StudentCreate,
      props: true,
      beforeEnter: [authMiddleware, adminMiddleware]
    },
    {
      path: '/studentdata',
      name: 'View Student',
      component: viewStudent,
      beforeEnter: [authMiddleware]
    },
    {
      path: '/login',
      name: 'Login/SignUp',
      component: LoginPage,
      meta: { public: true }
    },
    {
      path: '/cart',
      name: 'ShoppingCart',
      component: ShoppingCart,
      beforeEnter: [authMiddleware]
    }
  ],
})

export default router
