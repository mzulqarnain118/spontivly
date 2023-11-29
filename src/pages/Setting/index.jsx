import React, { lazy } from "react";
import { Container, Grid } from "@mui/material";
const SideMenuCard = lazy(() => import("../Dashboard/SideMenuCard"));
const ResponsiveAppBar = lazy(() => import("../Dashboard/ResponsiveAppBar"));
const Profile = lazy(() => import("./Profile"));
const Setting = () => {
  const [portal, setPortal] = React.useState("profile");

  const handlePortalChange = (newPortal) => {
    setPortal(newPortal);
  };
  const portalComponents = {
    profile: <Profile />,
  };

  const mainContent = portalComponents[portal];

  const containerStyles = {
    maxWidth: "1280px",
    margin: "80px auto 0",
    padding: "20px",
    p: 3,
  };
  const channels = [
    {
      header: "Settings",
      items: [
        { url: "profile", label: "Profile", icon: "PersonIcon" },
      ],
    },
  ]
  return (
    <>
    <ResponsiveAppBar />
    <Container component="main" sx={containerStyles}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2.5}>
          <SideMenuCard onPortalChange={handlePortalChange} channels={channels} />
        </Grid>
        <Grid item xs={12} sm={9.5}>
          {mainContent}
        </Grid>
    
      </Grid>
    </Container>
  </>
  )
}

export default Setting
