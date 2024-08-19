import ApiService from '../../../services/ApiService'
import { getQueryFormObject } from '../../../utils/utils'

const api = new ApiService()

const path = '/university'

export function getAllUniversities(data) {
	const qr = getQueryFormObject(data)
	return api.addAuthenticationHeader().get(`${path}/all${qr}`)
}
export function getAllStudents(data) {
	const qr = getQueryFormObject(data)
	return api.addAuthenticationHeader().get(`/student/batches${qr}`)
}