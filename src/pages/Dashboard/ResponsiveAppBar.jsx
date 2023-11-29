import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Avatar,
} from "@mui/material";
import logo from "assets/images/Logo.png";
import dashboardStyles from "styles/components/dashboardStyles";
import common from "components/common";
import { rmLocal } from "utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar({ setPanel, Panel, isBelowLG }) {
  const navigate = useNavigate();
  const { currentUser,loading } = useSelector((state) => state.dashboard);

  console.log("🚀 ~ file: ResponsiveAppBar.jsx:23 ~ ResponsiveAppBar ~ currentUser:", currentUser)

  const user = currentUser?.[0]?.user;
  const classes = dashboardStyles();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (setting) => {
    // if (setting == "Logout") {
    //   rmLocal("token");
    //   navigate("/auth");
    // }
    setAnchorElUser(null);
  };

  return (
   currentUser && <AppBar position="static" className={classes.appBar}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          {/* {isBelowLG && <common.MuiIcon
            name="Menu"
            color="primary.main"
            onClick={() => setPanel(!Panel)}
          />} */}
          <common.MuiIcon name="Adb" className={classes.logo} />
          <common.Img src={logo} />
          <Box className={classes.userBox}>
            <Box className={classes.userMenuBox}>
              <Box className="row gap-025">
                <Avatar src={currentUser?.[0].profile_pic} />
                <Box className="col-start">
                  <Typography color="primary.main">
                    {user.first_name + user.last_name}
                  </Typography>
                  <Typography variant="subtitle2">{user.email}</Typography>
                </Box>
                <common.MenuList
                  items={settings}
                  anchorEl={anchorElUser}
                  onClose={handleCloseUserMenu}
                  icon="ArrowDropDown"
                  iconClick={handleOpenUserMenu}
                  tooltip="Open settings"
                  className={classes.dropdownIcon}
                />
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
