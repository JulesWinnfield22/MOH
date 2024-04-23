import ApiService from '@/service/ApiService'

const path = 'service'

export async function createBenefit(data, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().post(`${path}/benefit`, data, config)
}