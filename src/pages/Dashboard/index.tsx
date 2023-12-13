import React, { useState, useEffect } from "react";
import { Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import SideMenuCard from "./SideMenuCard";
import General from "./General";
import FindMember from "./FindMember";
import Library from "./Library";
import RecommendationCard from "./RecommendationCard";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { setCurrentUser } from "redux/dashboardSlice";
import { useDispatch } from "react-redux";
import common from 'components/common';
import { ApiCall } from "utils";
import qs from 'qs';
import { useQuery } from 'react-query';

function Dashboard() {
  const dispatch = useDispatch();
  const [refetchUser, setRefetchUser] = useState(false);
  const fetchCurrentUser = async () => {
    const queryParams = {
      me: true,
    };

    const encodedParams = qs.stringify(queryParams);
    const apiUrl = `profile/?${encodedParams}`;

    const response = await ApiCall(apiUrl);
    return response.results;
  };
  const { data: currentUserData } = useQuery(
    ['currentUser', refetchUser],
    fetchCurrentUser
  );

  useEffect(() => {
    if (currentUserData) {
      dispatch(setCurrentUser(currentUserData));
    }
  }, [currentUserData]);
  
  const theme = useTheme();
  const isBelowLG = useMediaQuery(theme.breakpoints.down("lg"));
  const [Panel, setPanel] = useState(false);
  const [portal, setPortal] = React.useState("find");

  const handlePortalChange = (newPortal: any) => {
    setPortal(newPortal);
  };

  
  const getPortalSizes: any = (portal: any) => {
    if (portal === "general") {
      return { sideMenuSize: 3, mainContentSize: 6.5, recommendationSize: 2.5 };
    } else if (portal === "find" || portal === "library") {
      return { sideMenuSize: 2.5, mainContentSize: 9.5, recommendationSize: 0 };
    }
  };

  const { sideMenuSize, mainContentSize, recommendationSize }: any =
    getPortalSizes(portal);

  const portalComponents: any = {
    general: <General />,
    find: <FindMember setRefetchUser={setRefetchUser} />,
    library: <Library />,
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
      header: "CHANNELS",
      items: [
        { url: "", label: "General", icon: "Tag" }, //!replace url:"" with url:"general"
        { url: "", label: "Create Channel", icon: "AddCircle" },
      ],
    },
    {
      header: "COMMUNITY",
      items: [{ url: "", label: "Add Member", icon: "AddCircle" }],
    },
    {
      header: "RESOURCES",
      items: [
        { url: "find", label: "Find Member", icon: "Search" },
        { url: "library", label: "Library", icon: "YouTube" },
      ],
    },
  ];
  return (
    <>
      <ResponsiveAppBar
        setPanel={setPanel}
        Panel={Panel}
        isBelowLG={isBelowLG}
      />
      <Container component="main" sx={containerStyles}>
        <Grid container spacing={2}>
          {!isBelowLG ? (
            <Grid item xs={12} sm={sideMenuSize}>
              <SideMenuCard
                onPortalChange={handlePortalChange}
                channels={channels}
                setRefetchUser={setRefetchUser}
              />
            </Grid>
          ) : (
            <common.SidePanel openPanel={Panel} setPanel={setPanel} anchor="left">
              <SideMenuCard
                onPortalChange={handlePortalChange}
                  channels={channels}
                  setPanel={setPanel}
                  setRefetchUser={setRefetchUser}
              />
            </common.SidePanel>
          )}
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
