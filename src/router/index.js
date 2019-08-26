import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'

import Welcome from '@/views/welcome'
import NotFount from '@/views/404'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // name选项作用：当路径太长时，用name值可以跳转
    // 跳转方便一些，之前是用$router.push('/login') 现在可以用 $router.push({name:'login})
    { path: '/login', name: ' login', component: Login },
    { path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ] },
    { path: '*', name: '404', component: NotFount }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
