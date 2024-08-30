import ApiService from '../services/ApiService';
import axios from 'axios';

const backendApiUrl = import.meta.env?.v_API_URL;
const refreshAPi = axios.create({
  baseURL: backendApiUrl,
  // timeout: 10000,
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export function signup(data, config = {}) {
  const api = new ApiService();
  return api.post('users/signUp', data, config);
}

export function login(data, config = {}) {
  const api = new ApiService();

  return api.post('users/signin', data, config);
}

export async function refreshToken(token) {
  try {
    const res = await refreshAPi.post(`${backendApiUrl}/users/refresh-token`, token)
    console.log(res)
    return {
      success: true,
      data: res.data
    }
  } catch(err) {
    return {
      success: false,
      data: res.data
    }
  }
}
