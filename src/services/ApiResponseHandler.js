import { useAuth } from '../store/auth'
import { refreshToken } from '../auth/authapi'
import axios from 'axios'
import { useRouter } from 'vue-router'

let isRefreshing = false; // Global state to track refresh
let failedQueue = []; // Queue to hold requests during refresh

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export async function responseHandler(request, config) {
  if (!(request instanceof Promise)) return;

  const router = useRouter();
  const auth = useAuth();

  try {
    const res = await request;
    return {
      status: res.status,
      data: res.data,
      success: true,
      error: '',
    };
  } catch (error) {
    // Handle 401 Unauthorized Errors
    const originalRequest = config;
    
    if (error.response?.status === 401 && location.pathname !== '/login') {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const res = await refreshToken({ token: auth.auth?.user?.refreshToken });

          if (!res.success) {
            processQueue(null, null);
            auth.logout();
            router.push(`/login?redirect=${location.pathname}`);
            return;
          }

          auth.setToken(res.data);
          isRefreshing = false;
          processQueue(null, res.data.accessToken);
        } catch (err) {
          processQueue(err, null);
          auth.logout();
          router.push(`/login?redirect=${location.pathname}`);
        }
      }

      // Queue the failed request until the refresh is complete
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return axios(originalRequest);
      }).catch(err => Promise.reject(err));
    }

    // Handle other errors
    if (error.response) {
      return {
        success: false,
        data: null,
        status: error.response.status,
        error: error.response?.data?.message || error.message,
      };
    }

    // Handle Network Errors
    if (error.request) {
      return {
        success: false,
        data: null,
        status: error.code,
        error: error.message,
      };
    }

    // Fallback for unknown errors
    return {
      success: false,
      data: null,
      status: error.code || 500,
      error: error.message || 'An unknown error occurred',
    };
  }
}
