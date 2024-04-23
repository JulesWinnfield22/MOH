import ApiService from '@/service/ApiService'

const path = `/service`

export async function getClaimCategories(config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(`${path}/category`, config)
}

export async function getTypesOfCategories(category, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(`${path}/list?category=${category}`, config)
}

export async function removeClaimService(id, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().delete(`${path}/${id}`, config)
}
