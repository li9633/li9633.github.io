import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: 'https://api.xindev.com',
  timeout: 10000 // 请求超时时间
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 从localStorage获取token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 对响应数据做统一处理
    return response.data
  },
  error => {
    let message = '请求失败'
    if (error.response.code !== 200) {
      message = error.response.data.msg || error.msg
    }
    return Promise.reject({ message })
  }
)

export default request
