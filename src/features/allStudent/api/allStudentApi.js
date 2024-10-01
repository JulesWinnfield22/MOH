import ApiService from '../../../services/ApiService';
import { getQueryFormObject } from '../../../utils/utils';

const api = new ApiService();

const path = '/student';
export function getAllStudent(query = {}) {
  const qr = getQueryFormObject(query);
  return api.addAuthenticationHeader().get(`${path}/all${qr}`);
}
