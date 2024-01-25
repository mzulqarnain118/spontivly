import { AppBar, Box, Toolbar, Typography, Container, Avatar } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/Org-placeholder.png'
import { Controls as common } from '../../components/common'
import { dashboardStyles } from '../../styles/components/dashboardStyles'

const settings = ['Events & Recommendations', 'Dashboard', 'Settings', 'Logout']

function ResponsiveAppBar({ setPanel, Panel, setEventsPanel, isBelowLG }) {
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
          <Toolbar disableGutters>
            {isBelowLG && <common.MuiIcon name="Menu" color="primary.main" onClick={() => setPanel(!Panel)} />}
            <common.MuiIcon name="Adb" className={classes.logo} />
            <common.Img src={logo} width="9rem" />
            <Box className={classes.userBox}>
              <Box className={classes.userMenuBox}>
                <Box className="row gap-025">
                  <Avatar src={currentUser?.profile_pic} />
                  <Box className="col-start">
                    <Typography color="primary.main">{user?.first_name + user?.last_name}</Typography>
                    <Typography variant="lighterSubtitle2">{user?.email ?? ' '}</Typography>
                  </Box>
                  <common.MenuList
                    items={filteredSettings}
                    anchorEl={anchorElUser}
                    onClose={handleCloseUserMenu}
                    icon="ArrowDropDown"
                    iconClick={handleOpenUserMenu}
                    tooltip="Open settings"
                    color="primary.main"
                    className={classes.dropdownIcon}
                  />
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
  )
}

export { ResponsiveAppBar }
