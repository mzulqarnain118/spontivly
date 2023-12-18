import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import common from "./components/common";
import ThemeComponent from "./styles/Theme";
import Routes from "./Routes";
import "./App.css";
import "./styles/flexboxClasses.css";

export const App = () => {
  return (
    <>
      <Suspense
        fallback={<common.Spinner isOverlay={true} />}
      >
        <ThemeComponent>
          <RouterProvider router={Routes} />
        </ThemeComponent>
      </Suspense>
    </>
  );
}
export default App;
