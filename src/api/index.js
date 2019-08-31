import axios from 'axios'
import store from '@/store'
import router from '@/router'// 用router来跳转页面
import JSONBIG from 'json-bigint'// 导入json-bigint包

// 进行json-bigint配置
// 自定义转换响应格式
axios.defaults.transformResponse = [(data) => {
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]

// 配置
// 1，基准配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 2，请求头配置
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`
// 做请求拦截器，在每一次请求前都会执行
axios.interceptors.request.use(config => {
  // 修改配置，加tokne
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use(res => res, err => {
  // 自己的逻辑
  // 1,获取状态码
  const status = err.response.status
  // 判断状态码是否是401
  if (status === 401) {
    store.delUser()
    // 如果 是401,跳转到登录 页面重新登录
    // 如何跳转，有两个方法
    // 1,原生方式改路径，router是基于更改hash值，#后面的值  /login====>#/login
    window.location.hash = '#/login'
    // 如果token无效了，但还一直保存在Application里，所有要清除无效token

    // 2,使用router进行跳转，$router本质是：在main.js导入了index.js的实例，挂载了vue根实例下
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
