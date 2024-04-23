import ApiService from '@/service/ApiService'

const path = '/claim/agency/request'

export async function createClaim(data, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().post(path, data, config)
}
