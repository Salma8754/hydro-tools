import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DikeCalculator from '../views/DikeCalculator.vue'
import DistanceCalculator from '../views/DistanceCalculator.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dike',
      name: 'dike',
      component: DikeCalculator
    },
    {
      path: '/distance',
      name: 'distance',
      component: DistanceCalculator
    }
  ]
})

export default router 