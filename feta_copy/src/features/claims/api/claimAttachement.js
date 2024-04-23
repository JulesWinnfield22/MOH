import ApiService from '@/service/ApiService'
import { getQueryFormObject } from '@/utils/utils'

const path = '/claimattachments'
export async function addClaimAttachement(query, data, config = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().post(`${path}${qs}`, data, config)
}