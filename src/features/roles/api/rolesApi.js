import ApiService from '@/services/ApiService';
import { getQueryFormObject } from '@/utils/utils';

const api = new ApiService(import.meta.env?.v_API_URL);

const path = '/users/role';

export function getAllRoles(query = {}) {
  const qr = getQueryFormObject(query);
  return api.addAuthenticationHeader().get(`${path}/getAll${qr}`);
}

export function craeteRole(data) {
  return api.addAuthenticationHeader().post(`${path}/register`, data);
}

export function getRoleById(id) {
  return api.addAuthenticationHeader().get(`${path}/${id}`);
}
export function updateByRoleId(id, data) {
  return api.addAuthenticationHeader().put(`${path}/updateRole/${id}`, data);
}
