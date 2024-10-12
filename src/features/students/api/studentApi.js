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
export function getStudentsByRegistrationStatus(id, query = {}) {
	const qr = getQueryFormObject(query)
	return api.addAuthenticationHeader().get(`${path}/findMYUniversityStudentsByRegistrationStatus/${id}${qr}`)
}
export function getStudentsByCampusStatusSearch(id, query = {}, status = 'all') {
	const qr = getQueryFormObject(query);
	const statusParam = `status=${status}`; // Create status parameter without trailing &
	const queryString = qr ? `${statusParam}&${qr}` : statusParam; // Append qr if exists
	return api.addAuthenticationHeader().get(`${path}/findMYUniversityStudentsByCampusStatus/${id}?${queryString}`);
}
export function getStudentsByCampusStatus(id, query = {}) {
	const qr = getQueryFormObject(query)
	return api.addAuthenticationHeader().get(`${path}/findMYUniversityStudentsByCampusStatus/${id}${qr}`)
}

export function getStudentsByStatusUniId(id, query = {}) {
	const qr = getQueryFormObject(query)
	return api.addAuthenticationHeader().get(`${path}/findMYUniversityStudentsByStatus/${id}${qr}`)
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
export function passStudent(data) {
	return api.addAuthenticationHeader().put(`${path}/passStudentsToNextYear`,data)
	
}
export function updateStudent(ernpId,data) {
	return api.addAuthenticationHeader().put(`${path}/updateStudent/${ernpId}`,data)
}
		
export function getStudentDetails(id) {
	return api.addAuthenticationHeader().get(`${path}/${id}`)
}
