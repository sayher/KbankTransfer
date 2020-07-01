/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | JDB K BANK`
  const role = localStorage.getItem('Access-Token')
  // console.log(role);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!role) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
