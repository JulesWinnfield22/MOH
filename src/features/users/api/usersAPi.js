import { getQueryFormObject } from '@/utils/utils'
import ApiService from '../../../services/ApiService'

// import { getQueryFormObject } from "@/utils/utils";

const URL = import.meta.env?.v_API_URL
const api = new ApiService(URL)

const path = '/users'

export function getAllusers(query = {}) {
	const qr = getQueryFormObject(query)
	return api.addAuthenticationHeader().get(`${path}/all${qr}`)
}

export function createUser(data) {
	return api.addAuthenticationHeader().post(`${path}/signup`, data)
}