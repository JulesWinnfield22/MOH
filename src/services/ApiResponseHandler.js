import { useAuth } from '../store/auth'
import { refreshToken } from '../auth/authapi'
import axios from 'axios'
export async function responseHandler(request, config) {
  if (!(request instanceof Promise))
    return

  return request
    .then((res) => {
      console.log(res)
      return {
        status: res.status,
        data: res.data,
        success: true,
        error: '',
      }
    })
    .catch(async (error) => {
      // this is true when the request gets to the server
      // and there is some error on the server
      if(error.response && error.response.status == 401 && location.pathname != '/login') {
        const auth = useAuth()

        try {
          const res = await refreshToken({token: auth.auth?.user?.refreshToken})
          console.log(res)
          if(!res.success) {
            localStorage.clear()
           location = '/login?redirect=' + location.pathname
           return
          }
          auth.setToken(res.data)
          return await responseHandler.call(this, this.addAuthenticationHeader().api(config))
        } catch(err) {
          localStorage.clear()
          location = '/login?redirect=' + location.pathname
        }
      } else if (error.response) {
        return {
          success: false,
          data: null,
          status: error.response.status,
          error:
            (error.response?.data?.substr
              ? error.response.data.substr(6)
              : error.response?.data?.message) || error.message,
        }
      }
      // this is true when the request cant get to the server
      // eg. connection error
      if (error.request) {
        return {
          success: false,
          data: null,
          status: error.code,
          error: error.message,
        }
      }
    })
}

