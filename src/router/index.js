import Vue from 'vue'
import VueRouter from 'vue-router'
import WpMenu from '../components/wpMenu.vue'
import SeMenu from '../components/seMenu.vue'
import PgMenu from '../components/pgMenu.vue'
Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/wpMenu' },
  { path: '/wpMenu', component: WpMenu },
  { path: '/seMenu', component: SeMenu },
  { path: '/pgMenu', component: PgMenu },
]

const router = new VueRouter({
  routes
})

export default router
