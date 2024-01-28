import { AppBar, Box, Toolbar, Typography, useMediaQuery, useTheme, Container, Avatar } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/Org-placeholder.png'
import { Controls as common } from '../../components/common'
import { dashboardStyles } from '../../styles/components/dashboardStyles'

const settings = ['Events & Recommendations', 'Dashboard', 'Settings', 'Logout']

function ResponsiveAppBar({ setPanel, Panel, setEventsPanel, isBelowLG }) {
  const theme = useTheme()

  const isBelowSM = useMediaQuery(theme.breakpoints.down('sm'))
  const filteredSettings = isBelowLG ? settings : settings.slice(1)
  const navigate = useNavigate()
  const currentUser = useSelector((state: any) => state?.dashboard?.currentUser)
  const user = currentUser?.user
  const classes: any = dashboardStyles()
  const [anchorElUser, setAnchorElUser] = useState(null)
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = (setting) => {
    if (setting == 'Logout') {
      localStorage.clear()
      window.location.href = '/auth'
    } else if (setting == 'Settings') {
      navigate('/settings')
    } else if (setting == 'Dashboard') {
    } else if (setting == 'Events & Recommendations') {
      setEventsPanel((old) => !old)
    } else if (setting == 'Dashboard') {
      navigate('/')
    }

    setAnchorElUser(null)
  }

  return (
    currentUser && (
      <AppBar position="static" className={classes.appBar}>
        <Container maxWidth={false}>
          <Toolbar disableGutters sx={{ p: { xs: 2, sm: 0 } }}>
            {isBelowLG && <common.MuiIcon name="Menu" color="primary.main" onClick={() => setPanel(!Panel)} />}
            <common.MuiIcon name="Adb" className={classes.logo} />
            <common.Img src={logo} width="9rem" />
            <Box className={classes.userBox}>
              <Box className={classes.userMenuBox}>
                <Box className="row-end gap-025">
                  {!isBelowSM && UserProfile()}
                  <common.MenuList
                    items={filteredSettings}
                    anchorEl={anchorElUser}
                    onClose={handleCloseUserMenu}
                    icon={isBelowSM ? 'MoreVert' : 'ArrowDropDown'}
                    iconClick={handleOpenUserMenu}
                    tooltip="Open settings"
                    color="primary.main"
                    className={classes.dropdownIcon}
                  >
                    {isBelowSM && <Box className="row gap-025">{UserProfile()}</Box>}
                  </common.MenuList>
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
  )

  function UserProfile() {
    return (
      <>
        <Avatar src={currentUser?.profile_pic} />
        <Box className="col-start">
          <Typography color="primary.main">{user?.first_name + user?.last_name}</Typography>
          <Typography variant="lighterSubtitle2">{user?.email ?? ' '}</Typography>
        </Box>
      </>
    )
  }
}

export { ResponsiveAppBar }
