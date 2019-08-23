import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // name选项作用：当路径太长时，用name值可以跳转
    // 跳转方便一些，之前是用$router.push('/login') 现在可以用 $router.push({name:'login})
    { path: '/login', name: ' login', component: Login }
  ]
})

export default router
