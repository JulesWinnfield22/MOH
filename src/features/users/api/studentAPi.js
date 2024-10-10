import { getQueryFormObject } from '@/utils/utils'
import ApiService from '../../../services/ApiService'

// import { getQueryFormObject } from "@/utils/utils";

const URL = import.meta.env?.v_API_URL
const api = new ApiService(URL)

const path = '/student'

export function getAllstudents(query = {}) {
	const qr = getQueryFormObject(query)
	return api.addAuthenticationHeader().get(`${path}/all${qr}`)
}

export function createStudent(data) {
	return api.addAuthenticationHeader().post(`${path}/create`, data)
}

export function removeStudent(id) {
	return api.addAuthenticationHeader().delete(`${path}/DeleteStudent/${id}`);
  }