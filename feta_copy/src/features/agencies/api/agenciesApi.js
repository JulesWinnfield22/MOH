import ApiService from '@service/ApiService'
import { extendRef } from '@vueuse/core'
import { getQueryFormObject } from '@/utils/utils'

const path = '/agency'
const reviewedPath = '/bought-insurance/insurance/reviewed/list'
const payPath = '/insuredperson/pay/insurance'
const payedPath = '/insuredperson/list/debited'
const approvePath = '/insuredperson/create-certificate'
const approvedList = '/bought-insurance/insurance/approved/list'
const paidPath = '/insuredperson/list/paid'

export async function getAllAgenncies(query = {}, config = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${path}/list${qs}`, config)
}

export async function getAgennciesWithPolicy(query = {}, config = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${path}/list/withpolicy${qs}`, config)
}

export async function getAgennciesNoPolicy(query = {}, config = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${path}/list/nopolicy${qs}`, config)
}

export async function getAgencyById(id, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(`${path}/${id}`, config)
}

export async function addAgency(agency, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().post(path, agency)
}

export async function editAgency(id, agency, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().put(`${path}/${id}`, agency)
}

export async function getPayed(config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(`${payedPath}`)
}

export async function approve(id, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().put(`${approvePath}/${id}`)
}

export async function getApproved(config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(`${approvedList}`)
}

export async function searchAgencies(search, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(`${path}/list?search=${search}`, config)
}

export async function searchWithPolicy(query = {}, config = {}) {
  console.log('asd')
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${path}/list/withpolicy${qs}`, config)
}

export async function searchNopolicy(search, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(`${path}/list/nopolicy?search=${search}`, config)
}

export async function getAgency(id, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(`${path}/${id}`, config)
}

export async function generatePolicy(id, query = {}, config = {}) {
  const api = new ApiService()
  const qs = Object.keys(query) 
  .reduce((querys, q, idx) => {
    querys += `${q}=${query[q]}`
    if(idx != Object.keys(query).length - 1) 
    querys += `&`
    return querys
  }, "?")
  return api.addAuthenticationHeader().put(`${path}/policy/generate/${id}${qs}`)
}

export async function getReviewed() {
  const api = new ApiService()
  return await api.addAuthenticationHeader().get(`${reviewedPath}`)
}

export async function pay(id, query) {
  const api = new ApiService()
  const qs = Object.keys(query) 
  .reduce((querys, q, idx) => {
    querys += `${q}=${query[q]}`
    if(idx != Object.keys(query).length - 1) 
    querys += `&`
    return querys
  }, "?")
  return await api.addAuthenticationHeader().put(`${payPath}/${id}${qs}`)
}

export async function removeAgency(id, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().delete(`${path}/${id}`, config)
}

export async function getPaidDebited() {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(paidPath)
}