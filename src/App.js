import React, { Suspense, lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import common from "./components/common";
import "./App.css";
import "./styles/flexboxClasses.css" 
const OnBoarding = lazy(() => import("./pages/onboarding/OnBoarding"));

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <OnBoarding />,
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
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}
export default App;
