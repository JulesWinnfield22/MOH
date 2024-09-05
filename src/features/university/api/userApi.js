import ApiService from '../../../services/ApiService'
import { getQueryFormObject } from '../../../utils/utils'

const api = new ApiService()

const path = '/users'

export function getAllUniversities(data) {
	const qr = getQueryFormObject(data)
	return api.addAuthenticationHeader().get(`${path}/all${qr}`)
}

export function getAllUsers(data) {
	const qr = getQueryFormObject(data)
	return api.addAuthenticationHeader().get(`${path}/allUsers${qr}`)
}

export function updateUser(id, data) {
	const qr = getQueryFormObject(data)
	return api.addAuthenticationHeader().put(`${path}/updateUser/${id}`, data)
}