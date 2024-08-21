import ApiService from '../../../services/ApiService'

// import { getQueryFormObject } from "@/utils/utils";

const URL = import.meta.env?.v_API_URL
const api = new ApiService(URL)

const path = '/student'

export function getBatchStudents() {
//   const qr = getQueryFormObject(query);
  return api
    .addAuthenticationHeader()
    .get(`${path}/batches/batchNumber`)
}

