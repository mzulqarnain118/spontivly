import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './components/common/ProtectedRoute'
const Auth = lazy(() => import('./pages/Auth').then((module) => ({ default: module.Auth })))
const OnBoarding = ProtectedRoute(lazy(() => import('./pages/onboarding').then((module) => ({ default: module.OnBoarding }))))
const Dashboard = ProtectedRoute(lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.Dashboard }))))
const IndividualLibrary = ProtectedRoute(lazy(() => import('./pages/Dashboard/IndividualLibrary').then((module) => ({ default: module.IndividualLibrary }))),"/library/:id")
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
    path: '/library/:id',
    element: <IndividualLibrary />
  },
  {
    path: '/settings',
    element: <Setting />
  }
])

export { Routes } // Correct the export syntax
