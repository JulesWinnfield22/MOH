import ApiService from '../services/ApiService'


export function signup(data, config = {}) {
  const api = new ApiService()
  return api.post('users/signUp', data, config)
}

export function login(data, config = {}) {
  const api = new ApiService()

  return api.post('users/signin', data, config)
}


export function refreshToken(token) {
const api = new ApiService()

  return api.post('/users/refresh-token', token)
}