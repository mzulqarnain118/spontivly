import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Controls as common } from './components/common'
import { Routes } from './Routes'
import { Theme } from './styles/Theme'
import './App.css'
import './styles/flexboxClasses.css'

const App = () => {
  
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
