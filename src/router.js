import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '@/views/NotFound'

const routerOptions = [
  { path: '/', component: 'MapView' },
  { path: '/dashboard', component: 'Dashboard' },
  { path: '/listview', component: 'TextView' },
  { path: '/serversearchview', component: 'ServerSearchView' }
]

const routes = routerOptions.map(route => {
  return {
    path: route.path,
    name: route.component.toLowerCase(),
    component: () => import(`@/views/${route.component}.vue`),
    meta: route.meta
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    ...routes,
    { path: '*', component: NotFound }
  ]
})

export default router
