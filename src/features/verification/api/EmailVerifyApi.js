import { getQueryFormObject } from '@/utils/utils';
import ApiService from '../../../services/ApiService'

// import { getQueryFormObject } from "@/utils/utils";

const URL = import.meta.env?.v_API_URL
const api = new ApiService(URL)

const path = '/users'

export function sendEmailVerification(query={}) {
  const qr = getQueryFormObject(query);
  return api
    .addAuthenticationHeader()
    .post(`${path}/forgot-password${qr}`)
}
export function sendVerificationCode(query={}) {
    const qr = getQueryFormObject(query);
    return api
      .addAuthenticationHeader()
      .post(`${path}/forgot-password${qr}`)
  }

  export function resetPasswordApi(query={}) {
    const qr = getQueryFormObject(query);
    return api
      .addAuthenticationHeader()
      .post(`${path}/Createpassword${qr}`)
  }
