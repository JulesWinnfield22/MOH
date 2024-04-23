import ApiService from "@service/ApiService";

const path = "/users";

function getQueryies(queries) {
  const qs = Object.keys(queries) 
  .reduce((querys, q, idx) => {
    querys += `${q}=${queries[q]}`
    if(idx != Object.keys(queries).length - 1) 
      querys += `&`
    return querys
  }, "?")

  return qs
}
export async function getUsers(query = {}, config = {}) {
  const service = new ApiService();
  const qs = getQueryies(query)
  return await service.addAuthenticationHeader().get(`${path}/all${qs}`, config);
}

export async function addUser(user, config = {}) {
  const service = new ApiService();
 return await  service.addAuthenticationHeader().post(`${path}/signup`, user, config)
}

export async function editUser(id, user, config = {}) {
  const service = new ApiService();
 return await  service.addAuthenticationHeader().put(`${path}/${id}`, user, config)
}

export async function searchUser(query = {}, user, config = {}) {
  const service = new ApiService();
  const qs = getQueryies(query)
 return await  service.addAuthenticationHeader().post(`${path}/all${qs}`, user, config)
}

export async function deletehUser(id, config = {}) {
  const service = new ApiService();
 return await  service.addAuthenticationHeader().delete(`${path}/${id}`, config)
}