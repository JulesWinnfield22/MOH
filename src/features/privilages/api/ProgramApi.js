import ApiService from '@/services/ApiService';
import { getQueryFormObject } from '@/utils/utils';

const api = new ApiService(import.meta.env?.v_API_URL_PERMISSIONS);

const path = '/users/program';

export function getAllPrograms(query = {}) {
  const qr = getQueryFormObject(query);
  return api.addAuthenticationHeader().get(`${path}/all${qr}`);
}

export function createPrograms(data) {
  return api.addAuthenticationHeader().post(`${path}/create`, data);
}

export function removeProgram(id) {
  return api.addAuthenticationHeader().delete(`${path}/DeleteProgram?${id}`);
}

export function getProgramById(id) {
  return api.addAuthenticationHeader().get(`${path}/${id}`);
}

export function updatePrograms(id, data) {
  return api
    .addAuthenticationHeader()
    .put(`${path}/UpdateProgram/${id}`, data);
}
