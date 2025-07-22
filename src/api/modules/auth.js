import request from '../request'


export const login = (form) => {
  return request.post('/user/login', form)
}

export const register = (form) => {
  return request.post('/user/register', form)
}

// 验证token有效性
export const validateToken = (token) => {
  return request.get('/auth/validate', {
    headers: { Authorization: `Bearer ${token}` }
  })
}
