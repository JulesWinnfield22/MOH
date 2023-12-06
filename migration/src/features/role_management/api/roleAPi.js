import ApiService from '@service/ApiService'

const path = '/users/role'

export async function getRoles(config = {}) {
  const service = new ApiService()
  return await service.addAuthenticationHeader().get(path, config)
}

export async function addRole(config = {}) {
  const service = new ApiService()
  return await service.addAuthenticationHeader().post(path, config)
}

export async function editRole(config = {}) {
  const service = new ApiService()
  return await service.addAuthenticationHeader().patch(path, config)
}