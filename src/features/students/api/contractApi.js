import ApiService from '../../../services/ApiService'
import { getQueryFormObject } from '../../../utils/utils'

const api = new ApiService()

const path = '/contract'

export function FindAllByContractStatus() {
	return api.addAuthenticationHeader().get(`${path}/FindAllByContractStatus?contractStatus=Submitted`)
}

export function rejectContract(data) {
	return api.addAuthenticationHeader().put(`${path}/updateContractStatus?status=rejected`, data)
}

export function confirmContract(data) {
	return api.addAuthenticationHeader().put(`${path}/updateContractStatus?status=registered`, data)
}