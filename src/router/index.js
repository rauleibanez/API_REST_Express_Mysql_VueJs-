import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateClientView from '../views/CreateClientView.vue';
import EditClientView from '../views/EditClientView.vue';
import ListarClientView from '../views/ListarClientView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: ListarClientView
  },
  {
    path: '/newcliente',
    name: 'newcli',
    component: CreateClientView
  },
  {
    path: '/edicliente/:id',
    name: 'edicli',
    component: EditClientView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
