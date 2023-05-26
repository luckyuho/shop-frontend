// main.js 或其他入口文件
import axios from 'axios'
import { getCookie } from './auth'

// 创建 Axios 实例
const authApi = axios.create({
  baseURL: 'http://localhost:9432/api' // API 的基础 URL
})

// 添加请求拦截器
authApi.interceptors.request.use(config => {
  const jwtToken = getCookie('hexToken') // 从 cookie 中获取 JWT
  console.log('header jwtToken:', jwtToken)
  if (jwtToken) {
    config.headers['Content-Type'] = `application/json`
    config.headers.Authorization = `Bearer ${jwtToken}` // 添加 JWT 到 Authorization 头部
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 导出 Axios 实例
export default authApi
