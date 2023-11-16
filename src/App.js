import React, { Suspense, lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import common from "./components/common";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Theme from './styles/Theme'
import "./App.css";
import "./styles/flexboxClasses.css" 
const Signup = lazy(() => import('./pages/auth/Signup'));
const OnBoarding = lazy(() => import("./pages/onboarding/OnBoarding"));

function App() {

  const router = createBrowserRouter([
    {
      path: "/onboarding",
      element: <OnBoarding />,
    },
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Signup />,
    },
  ]);

  return (
    <>
      <Suspense
        fallback={
          <div className="body-overlay">
            <common.Spinner isLoading={true} />
          </div>
        }
      >
        <ThemeProvider theme={Theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Suspense>
    </>
  );
}
export default App;
