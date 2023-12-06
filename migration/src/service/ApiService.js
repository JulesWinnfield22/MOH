import axios from "axios";
import { responseHandler } from "./ApiResponseHandler";

const backendApiUrl = import.meta.env.v_API_URL;

const api = axios.create({
  // withCredentials: true,
  baseURL: backendApiUrl,
  // timeout: 10000,
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
  headers: {
    "Content-Type": "application/json",
  },
}); 

// api({
//   baseURL: 'http://localhost:3000/',
//   withCredentials: true,
//   headers: {
//     "Content-Type": 'application/json',
//   }
// })
// .then(res => {
//   console.log(res)
// })
// .catch(err => {
//   console.log(err.message)
// })

export default class ApiService {
  /**
   * 
   * @param {string} url 
   * @param {Object} config 
   * @returns 
   */
  async get(url, config = {}) {
    return await responseHandler(
      api({
        ...config,
        url,
        method: "get",
      })
    );
  }

  async post(url, data, config = {}) {
    return await responseHandler(
      api({
        ...config,
        url,
        data,
        method: "post",
      })
    );
  }

  async put(url, data, config = {}) {
    return await responseHandler(
      api({
        ...config,
        url,
        data,
        method: "put",
      })
    );
  }

  async patch(url, data, config = {}) {
    return await responseHandler(
      api({
        ...config,
        url,
        data,
        method: "patch",
      })
    );
  }

  async delete(url, config = {}) {
    return await responseHandler(
      api({
        ...config,
        url,
        method: "delete",
      })
    );
  }

  addAuthenticationHeader() {
    api.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlemVuZSIsInByaXZpbGVnZXMiOlt7InByaXZpbGVnZSI6IkhhbWxldCBSZWFkIGFuZCBXcml0ZSIsIm1ldGhvZHMiOlsiUE9TVCIsIkdFVCIsIkRFTEVURSIsIlBBVENIIl19LHsicHJpdmlsZWdlIjoiVXNlciBSZWFkIGFuZCBXcml0ZSIsIm1ldGhvZHMiOlsiUE9TVCIsIkdFVCIsIkRFTEVURSIsIlBBVENIIl19LHsicHJpdmlsZWdlIjoiUGF5bWVudCBSZWFkIGFuZCBXcml0ZSIsIm1ldGhvZHMiOlsiUE9TVCIsIkdFVCIsIlBBVENIIl19XSwiaWF0IjoxNzAwOTAxODA5LCJleHAiOjYxNzAwOTAxODA5fQ.B8cpNxJcXepmQ5xiS-kle_T_KakOvQMRTzcht1y-h1Y`;
    return this
  }
}
