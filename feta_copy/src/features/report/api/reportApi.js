import { getQueryFormObject } from '@/utils/utils'
import ApiService from '@service/ApiService'

const path = '/reports'
const reportPath = '/reports/certificate/issued/list'

export async function getAllReports(query = {}, config = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${reportPath}${qs}`)
}

export  async function getAllBranches(){
  const api = new ApiService()
  return api.addAuthenticationHeader().get('insurance/dropdown')
}