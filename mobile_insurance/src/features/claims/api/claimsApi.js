import ApiService from '@/service/ApiService'
import { getQueryFormObject } from '@/utils/utils'

const path = '/claim/insurance'
const servicePath = '/claim'
const getClaimAttachementePath = '/claimattachments'
const getBeneficiariesPath = '/beneficiary/list'
const getClaimedSerivcePath = '/claim/claimed-services'


export async function getRegistered(query, config = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${path}/registered/list${qs}`, config)
}

// export async function getAuthorized(query, config = {}) {
//   const api = new ApiService()
//   const qs = getQueryFormObject(query)
//   return api.addAuthenticationHeader().get(`${path}/registered/list${qs}`, config)
// }

export async function getApproved(query, config = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${path}/approved/list${qs}`, config)
}

export async function getClaimById(id, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(`/claim/details/${id}`, config)
}

export async function getDenied(query, config = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${path}/rejected/list${qs}`, config)
}

// export async function getClaimService(id, config = {}) {
//   const api = new ApiService()
//   const qs = getQueryFormObject(query)
//   return api.addAuthenticationHeader().get(`${getClaimedSerivcePath}/claimUuid=${qs}`, config)
// }

export async function getClaimPayment(query, config = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${path}/payment/list${qs}`, config)
}

export async function getAuthorized(query, config = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${path}/authorized/list${qs}`, config)
}

export async function getPaidClaims(query, config = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${path}/paid/list${qs}`, config)
}

export async function getReviewed(query, config = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${path}/reviewed/list${qs}`, config)
}

export async function getRequested(query, config = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return api.addAuthenticationHeader().get(`${path}/requested/list${qs}`, config)
}

export async function reviewClaim(data, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().put(`${path}/review`, data, config)
}

export async function authorizeClaim(data, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().put(`${path}/authorize`, data, config)
}

export async function approveClaim(data, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().put(`${path}/approve`, data, config)
}

export async function denyClaim(data, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().put(`/claim/deny?comment=${data.comment}&claimUuid=${data.id}`, config)
}

export async function registerClaim(id, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().put(`${path}/register?claimUuid=${id}`, null, config)
}

export async function payClaim(data, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().put(`${path}/pay`, data, config)
}

export async function getClaimDetail(id, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(`${servicePath}/details/${id}`, config)
}

export async function getClaimService(id, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(`${servicePath}/claimed-services?claimUuid=${id}`, config)
}

export async function getClaimAttachements(id, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(`${getClaimAttachementePath}/${id}`, config)
}

export async function getBeneficiaries(id, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(`${getBeneficiariesPath}/${id}`, config)
}

export async function getApprovalDetail(id, config = {}) {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(`/claim/claim-approver-details?claimUuid=${id}`, config)
}

export async function getAttachementFile(id, config) {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(`${getClaimAttachementePath}/open?claimAttachmentUuid=${id}`, config)
}

export async function updateClaimPayment(data, config) {
  const api = new ApiService()
  return api.addAuthenticationHeader().put('/service/benefit', [data], config)
}