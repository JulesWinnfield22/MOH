import ApiService from '@/services/ApiService';
import { getQueryFormObject } from '@/utils/utils';

const api = new ApiService(import.meta.env?.v_API_URL_PERMISSIONS);

const path = '/users/privilege';

export function getAllPermissions(query = {}) {
  const qr = getQueryFormObject(query);
  return api.addAuthenticationHeader().get(`${path}/all${qr}`);
}

export function createPermission(data) {
  return api.addAuthenticationHeader().post(`${path}/create`, data);
}

export function removePermission(id) {
  return api.addAuthenticationHeader().delete(`${path}/${id}`);
}

export function getPermissionById(id) {
  return api.addAuthenticationHeader().get(`${path}/privilege/${id}`);
}

export function updatePermission(id, data) {
  return api
    .addAuthenticationHeader()
    .put(`${path}/updatePrivilege/${id}`, data);
}
