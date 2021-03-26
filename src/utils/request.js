// 请求模块
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net/',
  timeout: 5000
})

export default request
