import { getQueryFormObject } from '@/utils/utils';
import ApiService from '@service/ApiService'
const path = "/users/privilege";

export async function getPrivilage(query = {}, config = {}) {
  const api = new ApiService();
  const qs = Object.keys(query) 
  .reduce((querys, q, idx) => {
    querys += `${q}=${query[q]}`
    if(idx != Object.keys(query).length - 1) 
    querys += `&`
    return querys
  }, "?")
const response =  await api.addAuthenticationHeader().get(`${path}${qs}`, config)
return response
}

export async function getActivePrivilage(config = {}) {
  const api = new ApiService();
  const response =  await api.addAuthenticationHeader().get(`${path}?status=Active`, config)
  return response
}

export async function getPrivilages(query = {}, config = {}) {
  const api = new ApiService();
  const qs = getQueryFormObject(query)
  const response =  await api.addAuthenticationHeader().get(`${path}/list${qs}`, config)
  return response
}

export async function addPrivilage(data, config = {}) {
  const api = new ApiService();
  return await api.addAuthenticationHeader().post(path, data, config)
}

export async function editPrivilage(id, data, config = {}) {
  const api = new ApiService();
  return await api.addAuthenticationHeader().put(`${path}/${id}`, data, config)
}

export async function searchPrivilage(search, config = {}) {
  const api = new ApiService();
  return await api.addAuthenticationHeader().get(`${path}/list?search=${search}`, config)
}

export async function deletePrivilage(id, config = {}) {
  const api = new ApiService();
  return await api.addAuthenticationHeader().delete(`${path}/${id}`, config)
}