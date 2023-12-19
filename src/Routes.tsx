import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { PdfViewer } from './components/common/PdfViewer'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import { persistor } from './redux/store'
const Auth = lazy(() => import('./pages/Auth').then((module) => ({ default: module.Auth })))
const OnBoarding = ProtectedRoute(lazy(() => import('./pages/onboarding').then((module) => ({ default: module.OnBoarding }))))
const Dashboard = ProtectedRoute(lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.Dashboard }))))
const Setting = ProtectedRoute(
  lazy(() => import('./pages/Setting').then((module) => ({ default: module.Setting }))),
  '/settings'
)

const Routes = createBrowserRouter([
  {
    path: '/onboarding',
    element: (
      <PersistGate persistor={persistor}>
        <OnBoarding />
      </PersistGate>
    ) //Persisted This routes with redux-persist
  },
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/settings',
    element: <Setting />
  },
  {
    path: '/pdf-viewer/:url',
    element: <PdfViewer />
  }
])

export { Routes } // Correct the export syntax
