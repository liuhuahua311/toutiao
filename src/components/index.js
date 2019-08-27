// 封装一个插件，目的是全局注册components下所有的组件
import MyBread from '@/components/my-bread'
export default {
  install (Vue) {
    // Vue对象 在main.js会使用Vue.use(插件)调用install函数，传入当前vue对象
    Vue.component(MyBread.name, MyBread)
  }
}
