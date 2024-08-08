import ApiService from '../../services/ApiService'

const api = new ApiService()

const path = 'student'

export function importNewBatch(data, config) {
  return api.addAuthenticationHeader().post(`${path}/upload`, data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
