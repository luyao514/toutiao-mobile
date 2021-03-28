// 请求模块
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 生成axios实例
const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net/',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
  // 给请求添加token
  const {
    user
  } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
request.interceptors.response.use(res => {
  // 正常响应时执行的函数
  return res
}, async err => { // 响应出错的时候会执行的函数
  // 判断响应出错是不是因为身份认证错误
  if (err.response && err.response.status === 401) {
    // 获取Vuex保存的user用户数据
    const user = store.state.user
    if (!user || !user.refresh_token) {
      // 不存在user，或者user里面不存在refresh_token的情况，跳转到登录页面
      router.push('/login')
    }
    // 存在refresh_token的情况，发送请求获取新token
    try {
      const {
        data: {
          data
        }
      } = await axios({
        method: 'put',
        url: 'http://toutiao-app.itheima.net/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      console.log(data)
      // 将最新的refresh_token存储到Vuex和localStorage中
      store.commit('setToken', {
        token: data.token,
        refresh_token: user.refresh_token
      })
      // 重新发送本次请求
      return request(err.config)
    } catch (err) {
      router.push('/login')
    }
  }
})

export default request
