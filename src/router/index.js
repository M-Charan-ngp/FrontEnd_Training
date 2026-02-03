import { createRouter, createWebHistory } from 'vue-router'
import UserView from '../views/UserView.vue'
import StudentCreate from '@/views/StudentCreate.vue'
import CounterView from '@/views/CounterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', 
      name: 'Users',
      component: UserView  
    },
    {
      path: '/counter', 
      name: 'Counters',
      component: CounterView
    },
    {
      path: '/create',
      name:'Create Student',
      component: StudentCreate
    }
  ],
})

export default router
