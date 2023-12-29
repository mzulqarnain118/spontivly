import { Container, Grid, Box, useMediaQuery, useTheme } from '@mui/material'
import { CreateChannel } from 'pages/Channels/CreateChannel'
import qs from 'qs'
import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Controls as common } from '../../components/common'
import { setCurrentUser } from '../../redux/dashboardSlice'
import { ApiCall } from '../../utils'
import { FindMember } from './FindMember'
import { General } from './General'
import { Library } from './Library'
import { RecommendationCard } from './RecommendationCard'
import { ResponsiveAppBar } from './ResponsiveAppBar'
import { SideMenuCard } from './SideMenuCard'

const containerStyles = {
  width: '80vw',
  margin: '80px auto 0',
  padding: '20px',
  p: 3
}

function Dashboard() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: any) => state?.dashboard?.currentUser)
  const role = currentUser?.user?.groups?.[0]?.name ?? ''
  const isModerator = role === 'Moderator'
  const [refetchUser, setRefetchUser] = useState(false)
  const channels = [
    {
      header: 'CHANNELS',
      items: [
        { url: 'general', label: 'General', icon: 'Tag' },
        { url: 'createChannel', label: 'Create Channel', icon: 'AddCircle', show: !isModerator }
      ]
    },
    {
      header: 'COMMUNITY',
      items: [{ url: '', label: 'Add Member', icon: 'AddCircle', show: !isModerator }]
    },
    {
      header: 'RESOURCES',
      items: [
        { url: 'find', label: 'Find Member', icon: 'Search' },
        { url: 'library', label: 'Library', icon: 'YouTube' }
      ]
    }
  ]
  const fetchCurrentUser = async () => {
    const queryParams = {
      me: true
    }

    const encodedParams = qs.stringify(queryParams)
    const apiUrl = `profile?${encodedParams}`

    const response = await ApiCall(apiUrl)

    return response?.results
  }
  const { data: currentUserData } = useQuery(['currentUser', refetchUser], fetchCurrentUser)

  useEffect(() => {
    if (currentUserData) {
      dispatch(setCurrentUser(currentUserData))
    }
  }, [currentUserData])

  const theme = useTheme()
  const isBelowLG = useMediaQuery(theme.breakpoints.down('lg'))
  const [Panel, setPanel] = useState(false)
  const [popup, setPopup] = useState(false)
  const [portal, setPortal] = React.useState('general')

  const handlePortalChange = (newPortal: any) => {
    if (newPortal === 'createChannel') {
      setPopup(true)
      setPortal((old) => old)
    } else {
      setPortal(newPortal)
    }
  }

  const getPortalSizes: any = (portal: any) => {
    if (portal === 'general') {
      return { sideMenuSize: 2.5, mainContentSize: 6.5, recommendationSize: 3 }
    } else if (['find', 'library'].includes(portal)) {
      return { sideMenuSize: 2.5, mainContentSize: 9.5, recommendationSize: 0 }
    }
  }

  const { sideMenuSize, mainContentSize, recommendationSize }: any = getPortalSizes(portal)

  const portalComponents: any = {
    general: <General />,
    find: <FindMember setRefetchUser={setRefetchUser} />,
    library: <Library />
  }

  const mainContent = portalComponents[portal]

  return (
    <>
      <ResponsiveAppBar setPanel={setPanel} Panel={Panel} isBelowLG={isBelowLG} />
      <Box component="main" sx={containerStyles}>
        <Grid container spacing={2}>
          {!isBelowLG ? (
            <Grid item xs={12} sm={sideMenuSize}>
              <SideMenuCard onPortalChange={handlePortalChange} channels={channels} setRefetchUser={setRefetchUser} setPanel={undefined} />
            </Grid>
          ) : (
            <common.SidePanel openPanel={Panel} setPanel={setPanel} anchor="left">
              <SideMenuCard onPortalChange={handlePortalChange} channels={channels} setPanel={setPanel} setRefetchUser={setRefetchUser} />
            </common.SidePanel>
          )}
          <Grid item xs={12} sm={mainContentSize}>
            {mainContent}
          </Grid>
          {portal === 'general' && recommendationSize > 0 && (
            <Grid item xs={12} sm={recommendationSize}>
              <RecommendationCard />
            </Grid>
          )}
        </Grid>
      </Box>
      <common.Popup
        openPopup={popup}
        setPopup={setPopup}
        width={'sm'}
        title={'Create Channel'}
        subTitle={'Please add the name to channel and create to continue. Once added you can invite members to your channel'}
      >
        <CreateChannel setPopup={setPopup} setRefetchUser={setRefetchUser} />
      </common.Popup>
    </>
  )
}

export { Dashboard }
