import Toast from '../components/common/Toast/Toast'

export default function ExceptionHandler(error) {
  const handleAuthError = () => {
    Toast('Your session has expired', 'success')
    localStorage.removeItem('token')
    window.location = '/auth'
  }

  const handleStatusCodeError = (status, msg) => {
    switch (status) {
      case 403:
        Toast(msg ?? 'This Role is restricted to access to this request.', 'error')
        break
      case 500:
        Toast(msg ?? 'Internal Server Error', 'error')
        break
      case 503:
        Toast(msg ?? 'Service Unavailable', 'error')
        break
      case 422:
        Toast(msg ?? 'Cannot Process Please Try Again', 'error')
        break
      case 405:
        Toast(msg ?? 'Not Found', 'error')
        break
      case 406:
        Toast(msg ?? 'Already Exist', 'error')
        break
      case 404:
        Toast(msg ?? 'API Not Found', 'error')
        break
      case 444:
        Toast(msg ?? 'Invalid Data', 'error')
        break
      case 430:
        Toast(msg ?? error.response.data, 'error')
        break
      case 413:
        Toast(msg ?? 'Payload Too Large', 'error')
        break
      default:
        Toast(msg ?? 'Unknown Error', 'error')
        break
    }
  }

  if (error.response) {
    const { msg } = error.response.data || {}
    const status = error.response.status

    if (status === 401) {
      handleAuthError()
    } else {
      handleStatusCodeError(status, msg)
    }
  } else {
    Toast('No Internet Connection', 'error')
  }
}
