import ApiService from '@/service/ApiService'

const api = new ApiService()

const path = '/claimslog'

export function getClaimLog(id, config = {}) {
  return api.addAuthenticationHeader().get(`${path}/${id}`, config);
}