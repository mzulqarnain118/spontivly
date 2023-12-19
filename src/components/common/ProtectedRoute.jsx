import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLocal } from '../../utils'
import { Spinner } from './Spinner'

const ProtectedRoute = (WrappedComponent, redirectPath = '/') => {
  const Wrapper = (props) => {
    const navigate = useNavigate()
    const isAuthenticated = getLocal('token')
    const isOnBoarded = getLocal('onboarding')

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/auth')
      } else if (!isOnBoarded) {
        navigate('/onboarding')
      } else {
        navigate(redirectPath)
      }
    }, [navigate, isAuthenticated, isOnBoarded])

    if (isAuthenticated) {
      return <WrappedComponent {...props} />
    }

    // Render loading state or error message if needed
    return <Spinner isOverlay={true} />
  }

  return Wrapper
}

export { ProtectedRoute }
