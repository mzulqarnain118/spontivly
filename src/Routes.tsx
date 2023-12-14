import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import ProtectedRoute from "components/common/ProtectedRoute";
import {PdfViewer} from "components/common/PdfViewer";
const Auth = lazy(() => import("pages/Auth"));
const OnBoarding = ProtectedRoute(lazy(() => import("pages/onboarding")));
const Dashboard = ProtectedRoute(lazy(() => import("pages/Dashboard")));
const Setting = ProtectedRoute(lazy(() => import("pages/Setting")),"/settings");

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
  {
    path: "/settings",
    element: <Setting />,
  },
  {
    path: "/pdf-viewer/:url",
    element: <PdfViewer />,
  },
  
]);

export default Routes; // Correct the export syntax
