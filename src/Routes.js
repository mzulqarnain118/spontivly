import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import ProtectedRoute from "components/common/ProtectedRoute";
const Auth = lazy(() => import("pages/Auth"));
const OnBoarding = ProtectedRoute(lazy(() => import("pages/onboarding")));
const Dashboard = ProtectedRoute(lazy(() => import("pages/Dashboard")));

const Routes = createBrowserRouter([
  {
    path: "/onboarding",
    element:  <PersistGate persistor={persistor}><OnBoarding/></PersistGate>,//Persisted This routes with redux-persist
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
