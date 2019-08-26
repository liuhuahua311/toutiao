// 负责用户信息的  存储，获取，，删除
const KEY = 'hm-toutiao-user'// sessionStorage唯一的标识
export default {
  // 存储用户信息
  setUser (user) {
    const jsonstr = JSON.stringify(user)// 转成json对象转成字符串
    window.sessionStorage.setItem(KEY, jsonstr)
  },
  // 获取用户信息
  getUser () {
    const jsonstr = window.sessionStorage.getItem(KEY) || '{}'
    // 可能没有数据，那么返回的数据是null，通过null返回数据，会报错，如果 通过空对象，不会报错
    return JSON.parse(jsonstr)// 转成对象形式的数据
  },
  //   删除用户信息
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
