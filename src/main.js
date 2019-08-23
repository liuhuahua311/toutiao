import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from '@/router'
// @代表的是vue-cil提供的路径别名，src绝对路径的别名
// 然后router下面的index.js省略了，在目录下默认索引文件（默认会去加载文件index名称的）
// import Style from '@/style/index.less'
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
