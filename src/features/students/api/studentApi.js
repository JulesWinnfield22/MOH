import ApiService from '../../../services/ApiService'
import { getQueryFormObject } from '../../../utils/utils'

const api = new ApiService()

const path = '/student'

export function getUniStudents(id) {
	return api.addAuthenticationHeader().get(`/university/${id}`)
}

export function rejectStudent(status, rejectionReason, data) {
	return Promise.all([
	  api.addAuthenticationHeader().put(`${path}/updateStudentStatus?status=${status}&rejectionReason=${rejectionReason}`, data),
	  //api.addAuthenticationHeader().put(`${path}/updateStudentStatus?rejectionReason=go`, data)
	]);
  }
export function confirmStudent(data) {
	return api.addAuthenticationHeader().put(`${path}/updateStudentStatus?status=registered`, data)
}
export function getStudentDetails(id) {
	return api.addAuthenticationHeader().get(`${path}/${id}`)
}
