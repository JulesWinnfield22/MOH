import ApiService from '@service/ApiService'

const path = '/reports'

export async function getAllReports() {
  const api = new ApiService()
  return api.addAuthenticationHeader().get(path)
}

export  async function getAllBranches(){
  const api = new ApiService()
  return api.addAuthenticationHeader().get('insurance/dropdown')
}