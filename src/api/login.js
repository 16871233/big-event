import request from '@/utils/request'

export const RegisterApi = ({ username, password, repassword }) => {
  return request.post('/api/reg', {
    username,
    password,
    repassword
  })
}

export const LoginApi = ({ username, password }) => {
  return request.post('/api/login', {
    username,
    password
  })
}
