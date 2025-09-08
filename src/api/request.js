// src/api/request.js
import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: 'https://api.xindev.com',
  timeout: 10000
})

// 创建专门用于GitHub API的实例
const githubRequest = axios.create({
  timeout: 10000
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
    // 处理请求错误
    console.error('请求错误:', error)
    ElMessage.error('请求发送失败')
    return Promise.reject(error)
  }
)

// GitHub请求拦截器
githubRequest.interceptors.request.use(
  config => {
    // 可以添加GitHub token以提高API限制
    // const githubToken = process.env.VUE_APP_GITHUB_TOKEN
    // if (githubToken) {
    //   config.headers.Authorization = `token ${githubToken}`
    // }
    return config
  },
  error => {
    console.error('GitHub请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 对响应数据做统一处理
    const data = response.data

    // 处理业务逻辑错误
    if (data.code && data.code !== 200) {
      const message = data.msg || '请求失败'
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }

    return data
  },
  error => {
    // 处理HTTP错误
    let message = '请求失败'

    if (error.response) {
      // 服务器返回了错误状态码
      switch (error.response.status) {
        case 400:
          message = error.response.data.msg || '请求参数错误'
          break
        case 401:
          message = error.response.data.msg || '未授权，请重新登录'
          break
        case 403:
          message = error.response.data.msg || '拒绝访问'
          break
        case 404:
          message = error.response.data.msg || '请求资源不存在'
          break
        case 500:
          message = error.response.data.msg || '服务器内部错误'
          break
        default:
          message = error.response.data.msg || `连接错误 ${error.response.status}`
      }
    } else if (error.request) {
      message = '网络错误，请检查网络连接'
    } else {
      // 其他错误
      message = error.message || '未知错误'
    }

    ElMessage.error(message)
    return Promise.reject(new Error(message))
  }
)

// GitHub响应拦截器
githubRequest.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.error('GitHub API错误:', error)
    return Promise.reject(error)
  }
)

export { githubRequest }
export default request
