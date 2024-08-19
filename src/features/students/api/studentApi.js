import ApiService from '../../../services/ApiService'
import { getQueryFormObject } from '../../../utils/utils'

const api = new ApiService()

const path = '/student'

export function getUniStudents(id) {
	return api.addAuthenticationHeader().get(`/university/${id}`)
}

export function getStudentbuId(uuid) {
	return api.addAuthenticationHeader().get(`${path}/${uuid}`)
}

export function getAllStudents(data) {
	const qr = getQueryFormObject(data)
	return api.addAuthenticationHeader().get(`${path}/batches${qr}`)
}
export function rejectStudent(status, rejectionReason, data) {
	return api.addAuthenticationHeader().put(`${path}/updateStudentStatus?status=${status}&rejectionReason=${rejectionReason}`, data);
}
	export function confirmStudent(data) {
	return api.addAuthenticationHeader().put(`${path}/updateStudentStatus?status=registered`, data)
}
export function getStudentDetails(id) {
	return api.addAuthenticationHeader().get(`${path}/${id}`)
}
