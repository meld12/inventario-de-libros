import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LibroNew from '../views/LibroNew.vue'
import LibroEdit from '../views/LibroEdit.vue'
import LibroView from '../views/LibroView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/createL',
    name: 'create',
    component: LibroNew
  },
  {
    path: '/editL/:id',
    name: 'edit',
    component: LibroEdit
  },
  {
    path: '/viewL/:id',
    name: 'view',
    component: LibroView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
