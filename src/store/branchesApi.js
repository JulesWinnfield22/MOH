import ApiService from '@service/ApiService'
import { getQueryFormObject } from '@/utils/utils'

const path = '/insurance'
const insuredPath = '/insuredperson/list'
const reviewPath = '/insuredperson/review/insurance'

export async function getAllbranches(query = {}, config = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${path}/list${qs}`, config)
}

export async function addBranch(branch, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().post(path, branch)
}

export async function getInsuredRequest(id, query = {}, config = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${insuredPath}/${id}${qs}`, config)
}

export async function editBranch(id, branch, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().put(`${path}/${id}`, branch)
}

export async function removeBranch(id, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().delete(`${path}/${id}`, config)
}

export async function reviewed(id, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().put(`${reviewPath}/${id}`, config)
}
