import { getQueryFormObject } from '@/utils/utils';
import ApiService from '../../../services/ApiService'

// import { getQueryFormObject } from "@/utils/utils";

const URL = import.meta.env?.v_API_URL
const api = new ApiService(URL)

const path = '/users'

export function sendEmailVerification(data) {
  return api
    .addAuthenticationHeader()
    .post(`${path}/forgot-password`, data)
}


  export function resetPasswordApi(data) {
    return api
      .addAuthenticationHeader()
      .post(`${path}/reset-password`, data)
  }
