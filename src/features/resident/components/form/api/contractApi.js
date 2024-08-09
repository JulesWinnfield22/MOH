import ApiService from '@/services/ApiService'
import { getQueryFormObject } from "@/utils/utils";

const api = new ApiService()

const path = '/contract'

export async function createContract(query = {}, data) {
	console.log(query, data)
	const qr = getQueryFormObject(query)
	return api.addAuthenticationHeader().post(`${path}/create${qr}`, data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}