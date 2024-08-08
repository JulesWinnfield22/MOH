import axios from 'axios';
import { useAuth } from '../store/auth';
import { responseHandler } from './ApiResponseHandler';

const backendApiUrl = import.meta.env?.v_API_URL;

export default class ApiService {
  api;
  _initApi(baseURL) {
    this.api = axios.create({
      // withCredentials: true,
      baseURL,
      // timeout: 10000,
      validateStatus: (status) => {
        return status >= 200 && status < 300;
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  constructor(baseURL) {
    if (baseURL) this._initApi(baseURL);
    else this._initApi(backendApiUrl);
  }

  /**
   *
   * @param {string} url
   * @param {Object} config
   * @returns
   */
  async get(url, config = {}) {
    const con = {
      ...config,
      url,
      method: 'get',
    };
    return await responseHandler.call(this, this.api(con), con);
  }

  async post(url, data, config = {}) {
    const con = {
      ...config,
      url,
      data,
      method: 'post',
    };
    return await responseHandler.call(this, this.api(con), con);
  }

  async put(url, data, config = {}) {
    const con = {
      ...config,
      url,
      data,
      method: 'put',
    };
    return await responseHandler.call(this, this.api(con), con);
  }

  async patch(url, data, config = {}) {
    const con = {
      ...config,
      url,
      data,
      method: 'patch',
    };
    return await responseHandler.call(this, this.api(con), con);
  }

  async delete(url, config = {}) {
    const con = {
      ...config,
      url,
      method: 'delete',
    };
    return await responseHandler.call(this, this.api(con), con, this);
  }

  addAuthenticationHeader() {
    const authStore = useAuth();
    this.api.defaults.headers.common.Authorization = `Bearer ${authStore.auth?.accessToken}`;
    return this;
  }
}
