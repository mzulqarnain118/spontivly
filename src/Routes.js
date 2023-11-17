import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "components/common/ProtectedRoute";
const Auth = lazy(() => import("./pages/Auth"));
const OnBoarding = ProtectedRoute(lazy(() => import("./pages/OnBoarding")));
const Dashboard = ProtectedRoute(lazy(() => import("./pages/Dashboard")));

const Routes = createBrowserRouter([
  {
    path: "/onboarding",
    element: <OnBoarding />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
]);

export default Routes; // Correct the export syntax
