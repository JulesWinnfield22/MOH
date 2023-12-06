import ApiService from "@service/ApiService";

const path = "/users";

export async function getUsers(query = {}, config = {}) {
  const service = new ApiService();
  const qs = Object.keys(query) 
  .reduce((querys, q, idx) => {
    querys += `${q}=${query[q]}`
    if(idx != Object.keys(query).length - 1) 
      querys += `&`
    return querys
  }, "?")
  return await service.addAuthenticationHeader().get(`${path}${qs}`, config);
}

export async function addUser(user, config = {}) {
  const service = new ApiService();
 return await  service.addAuthenticationHeader().post(path, user, config)
}

export async function editUser(user, config = {}) {
  const service = new ApiService();
 return await  service.addAuthenticationHeader().patch(path, user, config)
}