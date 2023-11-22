// ResponsiveAppBar.js
import React from "react";
import {
  AppBar,
  Menu,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { ArrowDropDown, Adb } from "@mui/icons-material";
import logo from "assets/images/Logo.png";
import profile from "assets/images/profile.jpg";
import dashboardStyles from "styles/components/dashboardStyles";
import common from "components/common";
import { useTheme } from "@mui/material/styles";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const classes = dashboardStyles();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
    const theme = useTheme();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Adb className={classes.logo} />
          <common.Img src={logo} loading="lazy" alt="" />
          <Box className={classes.userBox}>
            <Box className={classes.userMenuBox}>
              <Tooltip title="Open settings">
                <Box className={classes.avatarBox}>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={profile} />
                  </IconButton>
                  <Box >
                    <Typography color={theme.palette.common.black}>
                      Nick Fury
                    </Typography>
                    <Typography variant="subtitle2">
                      Avengers Inc.
                    </Typography>
                  </Box>
                  <ArrowDropDown
                    className={classes.dropdownIcon}
                    onClick={handleOpenUserMenu}
                  />
                </Box>
              </Tooltip>
              <Menu
                sx={{
                  mt: "45px",
                  right: 0,
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
