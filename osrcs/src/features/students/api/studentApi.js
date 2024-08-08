import ApiService from '../../../services/ApiService'
import { getQueryFormObject } from '../../../utils/utils'

const api = new ApiService()

const path = '/student'

export function getUniStudents(id) {
	return api.addAuthenticationHeader().get(`${path}/FindStudents/${id}`)
}

export function rejectStudent(data) {
	return api.addAuthenticationHeader().put(`${path}/updateStudentStatus?status=rejected`, data)
}

export function confirmStudent(data) {
	return api.addAuthenticationHeader().put(`${path}/updateStudentStatus?status=registered`, data)
}