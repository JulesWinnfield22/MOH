import ApiService from '../../../services/ApiService'

// import { getQueryFormObject } from "@/utils/utils";

const URL = import.meta.env?.v_API_URL
const api = new ApiService(URL)

const path = '/contract'

export function getContracts() {
//   const qr = getQueryFormObject(query);
  return api
    .addAuthenticationHeader()
    .get(`${path}/all`)
}
export function addContract(data) {
  //   const qr = getQueryFormObject(query);
  return api
    .addAuthenticationHeader()
    .post(`${path}/create`, data)
}
