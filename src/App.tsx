import React, { Suspense, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { getLocal } from 'utils'
import { Controls as common } from './components/common'
import { Routes } from './Routes'
import { Theme } from './styles/Theme'
import './App.css'
import './styles/flexboxClasses.css'

const App = () => {
  const isAuthenticated = getLocal('token')
  const isOnboarded = getLocal('onboarding')

  useEffect(() => {
    const handleRedirect = () => {
      if (isAuthenticated) {
        if (isOnboarded) {
          window.location.pathname === '/auth' && window.location.pathname 
        } else {
          window.location.pathname !== '/onboarding' && (window.location.pathname = '/onboarding')
        }
      }
    }

    handleRedirect()
  }, [isAuthenticated, isOnboarded])

  return (
    <>
      <Suspense fallback={<common.Spinner isOverlay={true} />}>
        <Theme>
          <RouterProvider router={Routes} />
        </Theme>
      </Suspense>
    </>
  )
}

export { App }
