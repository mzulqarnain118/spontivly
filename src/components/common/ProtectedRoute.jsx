import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getLocal } from '../../utils'

const PrivateRoutes = () => {
  const isAuthenticated = getLocal('token')

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />
}

export { PrivateRoutes }
