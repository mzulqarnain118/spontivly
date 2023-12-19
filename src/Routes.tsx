import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { PdfViewer } from './components/common/PdfViewer'
import { ProtectedRoute } from './components/common/ProtectedRoute'
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
    element: <OnBoarding />
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
