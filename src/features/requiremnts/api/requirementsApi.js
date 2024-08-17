import ApiService from '@/services/ApiService'

const api = new ApiService()

export function getRequiremtns() {
	return api.addAuthenticationHeader().gt
}
