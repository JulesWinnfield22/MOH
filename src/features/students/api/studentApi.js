import ApiService from '../../../services/ApiService'
import { getQueryFormObject } from '../../../utils/utils'

const api = new ApiService()

const path = '/student'

export function getUniStudents(id) {
	return api.addAuthenticationHeader().get(`/university/${id}`)
}

export function getStudentsByUniId(id, query = {}) {
	const qr = getQueryFormObject(query)
	return api.addAuthenticationHeader().get(`${path}/findMYUniversityStudents/${id}${qr}`)
}

export function getStudentbyId(uuid) {
	return api.addAuthenticationHeader().get(`${path}/${uuid}`)
}

export function getStudentbyBatch(batchNumber) {
	return api.addAuthenticationHeader().get(`${path}/batches/${batchNumber}`)
}

export function getAllStudents(data) {
	const qr = getQueryFormObject(data)
	return api.addAuthenticationHeader().get(`${path}/batches${qr}`)
}
export function getAllStudent(id, data) {
	const qr = getQueryFormObject(data)
	return api.addAuthenticationHeader().get(`${path}/all${qr}`)
}
export function getAllContract(id, data) {
	const qr = getQueryFormObject(data)
	return api.addAuthenticationHeader().get(`contract/findAllByContractStatus?contractStatus=Approved${qr}`)
}
export function rejectStudent(status, rejectionReason, data) {
	return api.addAuthenticationHeader().put(`${path}/updateStudentStatus?status=${status}&rejectionReason=${rejectionReason}`, data);
}
export function withdrawStud(camStatus, justificationStatus, data) {
	return api.addAuthenticationHeader().put(`${path}/updateCampusStatus?status=${camStatus}&jestificationForCampusStatus=${justificationStatus}`, data);
}
	export function confirmStudent(data) {
	return api.addAuthenticationHeader().put(`${path}/updateStudentStatus?status=registered`, data)
}
export function updateStudent(ernpId,data) {
	return api.addAuthenticationHeader().put(`${path}/updateStudent/${ernpId}`,data)
}
		
export function getStudentDetails(id) {
	return api.addAuthenticationHeader().get(`${path}/${id}`)
}
