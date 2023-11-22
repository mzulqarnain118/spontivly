import React, { lazy } from "react";
import { Container, Grid } from "@mui/material";
const SideMenuCard = lazy(() => import("./SideMenuCard"));
const General = lazy(() => import("./General"));
const FindMember = lazy(() => import("./FindMember"));
const Library = lazy(() => import("./Library"));
const RecommendationCard = lazy(() => import("./RecommendationCard"));
const ResponsiveAppBar = lazy(() => import("./ResponsiveAppBar"));


function Dashboard() {
  const [portal, setPortal] = React.useState("general");

  const handlePortalChange = (newPortal) => {
    setPortal(newPortal);
  };

  const getPortalSizes = (portal) => {
    if (portal === "general") {
      return { sideMenuSize: 2.5, mainContentSize: 7, recommendationSize: 2.5 };
    } else if (portal === "find" || portal === "library") {
      return { sideMenuSize: 2.5, mainContentSize: 9.5, recommendationSize: 0 };
    }
  };

  const { sideMenuSize, mainContentSize, recommendationSize } =
    getPortalSizes(portal);

  const portalComponents = {
    general: <General />,
    find: <FindMember />,
    library: <Library />,
  };

  const mainContent = portalComponents[portal];

  const containerStyles = {
    maxWidth: "1280px",
    margin: "80px auto 0",
    padding: "20px",
    p: 3,
  };

  return (
    <>
      <ResponsiveAppBar />
      <Container component="main" sx={containerStyles}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={sideMenuSize}>
            <SideMenuCard onPortalChange={handlePortalChange} />
          </Grid>
          <Grid item xs={12} sm={mainContentSize}>
            {mainContent}
          </Grid>
          {portal === "general" && recommendationSize > 0 && (
            <Grid item xs={12} sm={recommendationSize}>
              <RecommendationCard />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
