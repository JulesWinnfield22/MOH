import ApiService from '@service/ApiService.js'
import { getQueryFormObject } from '@/utils/utils'

const path = '/bought-insurance/insurance'
const insuredPersonPath = '/insuredperson'
const createDebitNotePath = '/insuredperson/create-debit-note'
const debitedPath= '/insuredperson/list/debited/persons'
const insuredPath = "/insuredperson"
const getDebiteAdvicePath = '/insuredperson/debit-advice'
const insuredDebitedPath = '/insuredperson/list/debited/persons'

export async function getRequested(query = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return await api.addAuthenticationHeader().get(`${path}/requested/list${qs}`)
}

export async function getRequestedPerson(id) {
  const api = new ApiService()
  return await api.addAuthenticationHeader().get(`${insuredPersonPath}/${id}`)
}

export async function createDebitNote(data) {
  const api = new ApiService()
  return await api.addAuthenticationHeader().put(createDebitNotePath, data)
}

export async function getDebitede(id) {
  const api = new ApiService()
  return await api.addAuthenticationHeader().get(`${debitedPath}/${id}`)
}

export async function getInsured(id) {
  const api = new ApiService()
  return await api.addAuthenticationHeader().get(`${insuredPath}/${id}`)
}

export async function getDebitAdvice(id) {
  const api = new ApiService()
  return await api.addAuthenticationHeader().get(`${getDebiteAdvicePath}/${id}`)
}

export async function payInsured(id, query = {}) {
  const api = new ApiService()
  const qs = getQueryFormObject(query)
  return await api.addAuthenticationHeader().put(`${insuredPath}/pay/insurance/${id}${qs}`)
}

export async function getIssuedPayed(id) {
  const api = new ApiService()
  return await api.addAuthenticationHeader().get(`${insuredDebitedPath}/${id}`)
}

export async function getBundleAttachement(id) {
  const api = new ApiService()
  return await api.addAuthenticationHeader().get("/certificate-attachments/" + id)
}

export async function getBundleAttachementFile(id, config = {}) {
  const api = new ApiService()
  return await api.addAuthenticationHeader().get("/certificate-attachments/open?agencyAttachmentUuid=" + id, config)
}

export async function getOneInsuredAttachemts(id) {
  const api = new ApiService()
  return await api.addAuthenticationHeader().get("/insured-attachments/" + id)
}

export async function getInsuredAttachementFile(id, config = {}) {
  const api = new ApiService()
  return await api.addAuthenticationHeader().get("/insured-attachments/open?insuredAttachmentUuid=" + id, config)
}

export async function getBeneficiaries(id) {
  const api = new ApiService()
  return await api.addAuthenticationHeader().get("/beneficiary/list/" + id)
}

export async function getCertificateApprover(id) {
  const api = new ApiService()
  return await api.addAuthenticationHeader().get("/insuredperson/certificate-approver-details?debitUuid=" + id)
}

// export async function getDebitede(id) {
//   const api = new ApiService()
//   return await api.addAuthenticationHeader().get(`${debitedPath}/${id}`)
// }
