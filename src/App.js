import React, { Suspense, lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>

  );
}
export default App;
