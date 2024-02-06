import axios from 'axios'
import nProgress from 'nprogress'
import { getLocal } from './index'
import { config } from '../config'
import { ExceptionHandler } from './ExceptionHandler'

// Create an Axios instance with default configuration

const apiInstance = axios.create({
  baseURL: config.VITE_BACKEND_URL
})

// Interceptor for request
apiInstance.interceptors.request.use((config) => {
  nProgress.start()
  const token = getLocal('token')

  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }

  return config
})

// Interceptor for response
apiInstance.interceptors.response.use(
  (response) => {
    nProgress.done()

    return response
  },
  (error) => {
    nProgress.done()
    ExceptionHandler(error)

    return Promise.reject(error)
  }
)

// ApiCall function using the Axios instance
export function ApiCall(url: string, setLoading: any = null, method = 'GET', data: any = null) {
  return apiInstance({
    url,
    method,
    data
  })
    .then((response) => {
      if (setLoading) {
        setLoading(false)
      }

      return response.data
    })
    .catch(() => {
      if (setLoading) {
        setLoading(false)
      }
      // You can still handle errors here if needed
      // For example, throw an error, log a message, etc.
      // throw new Error(`Unexpected error: ${error.message}`);
    })
}
