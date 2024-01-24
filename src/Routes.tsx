import { PrivateRoutes } from 'components/common/ProtectedRoute'
import { Error } from 'pages/Errors'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
const Auth = lazy(() => import('./pages/Auth').then((module) => ({ default: module.Auth })))
const OnBoarding = lazy(() => import('./pages/onboarding').then((module) => ({ default: module.OnBoarding })))
const Dashboard = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.Dashboard })))
const IndividualLibrary = lazy(() =>
  import('./pages/Dashboard/IndividualLibrary').then((module) => ({ default: module.IndividualLibrary }))
)
const Setting = lazy(() => import('./pages/Setting').then((module) => ({ default: module.Setting })))

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [
      {
        index: true,
        path: '/:portal',
        element: <Dashboard />
      },
      {
        path: 'onboarding',
        element: <OnBoarding />
      },
      {
        path: 'channels/:channelId',
        element: <Dashboard />
      },
      {
        path: '/:portal/:libraryId',
        element: <Dashboard />
      },
      {
        path: 'settings',
        element: <Setting />
      },
      {
        path: '404',
        element: <Error errorCode="404" />
      }
    ]
  },
  {
    path: 'auth',
    element: <Auth />
  },
  { 
    // Wildcard route for 404
    path: '*',
    element: <Error errorCode="404" />
  }
])

export { Routes }
