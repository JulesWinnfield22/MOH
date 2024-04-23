import ApiService from '@/service/ApiService'
import { getQueryFormObject } from '@/utils/utils'

const api = new ApiService()

const path = '/users'
const agencyPath = '/agency'

export function getAgencyusers(id, config = {}) {
  return api.addAuthenticationHeader().get(`${path}/agency/${id}`, config)
}

export function getAllAgencies(query = {}, config = {}) {
  const qr = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${agencyPath}/list/withpolicy${qr}`, config)
}