import ApiService from '../../../services/ApiService'
import { getQueryFormObject } from '../../../utils/utils'

const api = new ApiService()

const path = '/contract'
const docuPath = '/document'
export function FindAllByContractStatus() {
	return api.addAuthenticationHeader().get(`${path}/FindAllByContractStatus?contractStatus=Submitted`)
}

export function rejectContract(data) {
	return api.addAuthenticationHeader().put(`${path}/updateContractStatus?status=rejected`, data)
}

export function confirmContract(data) {
	return api.addAuthenticationHeader().put(`${path}/updateContractStatus?status=registered`, data)
}

export function getContractById(id) {
	return api.addAuthenticationHeader().get(`${path}/findByContractId/${id}`)
}

export function getContractFileById(id) {
	return api.addAuthenticationHeader().get(`${docuPath}/${id}`)
}