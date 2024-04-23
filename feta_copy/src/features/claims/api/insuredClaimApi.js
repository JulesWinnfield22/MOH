import ApiService from '@/service/ApiService'
import { getQueryFormObject } from '@/utils/utils'

const path = '/insuredperson'
export async function getInsured(query = {}, config = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${path}/claimcreation/search/branch${qs}`)
}
