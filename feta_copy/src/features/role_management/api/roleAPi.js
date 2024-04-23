import { getQueryFormObject } from '@/utils/utils'
import ApiService from '@service/ApiService'

const path = '/users/role'

export async function getRoles(query = {}, config = {}) {
  const service = new ApiService()
  const qs = getQueryFormObject(query)
  return await service.addAuthenticationHeader().get(`${path}/all${qs}`, config)
}

export async function addRole(config = {}) {
  const service = new ApiService()
  return await service.addAuthenticationHeader().post(path, config)
}

export async function editRole(id, role, config = {}) {
  console.log(role)
  const service = new ApiService()
  return await service.addAuthenticationHeader().put(`${path}/${id}`, role, config)
}

export async function searchRole(search, config = {}) {
  const service = new ApiService()
  return await service.addAuthenticationHeader().put(`${path}/all?search=${search}`, config)
}

export async function deleteRole(id, config = {}) {
  const service = new ApiService()
  return await service.addAuthenticationHeader().delete(`${path}/${id}`, config)
}