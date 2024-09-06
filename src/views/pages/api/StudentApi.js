import { getQueryFormObject } from '@/utils/utils'
import ApiService from '../../../services/ApiService'

// import { getQueryFormObject } from "@/utils/utils";

const URL = import.meta.env?.v_API_URL
const api = new ApiService(URL)

const path = '/student'

export function getStudents() {
//   const qr = getQueryFormObject(query);
  return api
    .addAuthenticationHeader()
    .get(`${path}/all`)
}

export function getBatchStudents(batchId, query = {}) {
     const qr = getQueryFormObject(query);
    return api
      .addAuthenticationHeader()
      .get(`${path}/batches/${batchId}${qr}`)
  }
  
export function addStudent(data) {
  //   const qr = getQueryFormObject(query);
  return api
    .addAuthenticationHeader()
    .post(`${path}/create`, data)
}
