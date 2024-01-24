import { Container, Grid, Box, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { AddMember } from 'pages/Channels/AddMember'
import { CreateChannel } from 'pages/Channels/CreateChannel'
import { Error } from 'pages/Errors'
import qs from 'qs'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Controls as common } from '../../components/common'
import { setCurrentUser } from '../../redux/dashboardSlice'
import { ApiCall } from '../../utils'
import { FindMember } from './FindMember'
import { General } from './General'
import { IndividualLibrary } from './IndividualLibrary'
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
  let { portal, libraryId } = useParams()

  portal = portal ?? 'channels'
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state: any) => state?.dashboard?.currentUser)
  const role = currentUser?.user?.groups?.[0]?.name ?? ''
  const isModerator = role === 'Moderator'
  const [refetchUser, setRefetchUser] = useState(false)
  const channels = [
    {
      header: 'CHANNELS',
      items: [{ url: 'createChannel', label: 'Create Channel', icon: 'AddCircle', show: !isModerator }]
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
  const { data: currentUserData } = useQuery({ queryKey: ['currentUser', refetchUser], queryFn: fetchCurrentUser })

  const location = useLocation()

  useEffect(() => {
    if (currentUserData) {
      const isChannelsRoute = location.pathname.endsWith('/channels')

      if (isChannelsRoute) {
        navigate(`/${portal}/${currentUserData?.[0]?.channels?.[0]?.id}`)
      }

      dispatch(setCurrentUser(currentUserData))
    }
  }, [currentUserData, location])

  const theme = useTheme()
  const isBelowLG = useMediaQuery(theme.breakpoints.down('lg'))
  const [Panel, setPanel] = useState(false)
  const [EventsPanel, setEventsPanel] = useState(false)
  const [popup, setPopup] = useState(false)
  const [memberPopup, setMemberPopup] = useState(false)
  const [addMemberChannelId, setAddMemberChannelId] = useState(null)

  const handlePortalChange = (newPortal: any, channelId: number) => {
    if (newPortal === 'createChannel') {
      setPopup(true)

      return
    } else if (newPortal === 'channels') {
      navigate(`/${newPortal}/${channelId}`)

      return
    }

    // Update the URL
    navigate(`/${newPortal}`)
  }

  const getPortalSizes: any = (portal: any) => {
    if (portal === 'channels') {
      return { sideMenuSize: 2.5, mainContentSize: !isBelowLG ? 6.5 : 9.5, recommendationSize: !isBelowLG ? 3 : 0 }
    } else if (['find', 'library'].includes(portal)) {
      return { sideMenuSize: 2.5, mainContentSize: 9.5, recommendationSize: 0 }
    } else {
      return 404
    }
  }

  const layout = getPortalSizes(portal)

  if (layout === 404) navigate('/404')
  const { sideMenuSize, mainContentSize, recommendationSize } = layout

  const portalComponents: any = {
    channels: <General />,
    find: <FindMember setRefetchUser={setRefetchUser} />,
    library: libraryId ? <IndividualLibrary /> : <Library />
  }

  const mainContent = portalComponents[portal]

  return layout === 404 ? null : (
    <>
      <ResponsiveAppBar setPanel={setPanel} setEventsPanel={setEventsPanel} Panel={Panel} isBelowLG={isBelowLG} />
      <Box component="main" sx={containerStyles}>
        <Grid container spacing={2}>
          {!isBelowLG ? (
            <Grid item xs={12} sm={sideMenuSize}>
              <SideMenuCard
                onPortalChange={handlePortalChange}
                setMemberPopup={setMemberPopup}
                channels={channels}
                setAddMemberChannelId={setAddMemberChannelId}
                setRefetchUser={setRefetchUser}
              />
            </Grid>
          ) : (
            <common.SidePanel openPanel={Panel} setPanel={setPanel} anchor="left">
              <SideMenuCard
                onPortalChange={handlePortalChange}
                setMemberPopup={setMemberPopup}
                channels={channels}
                setPanel={setPanel}
                setAddMemberChannelId={setAddMemberChannelId}
                setRefetchUser={setRefetchUser}
              />
            </common.SidePanel>
          )}
          <Grid item xs={12} sm={mainContentSize}>
            {mainContent}
          </Grid>
          {portal === 'channels' && recommendationSize > 0 && !isBelowLG && (
            <Grid item xs={12} sm={recommendationSize}>
              <RecommendationCard setRefetchUser={setRefetchUser} />
            </Grid>
          )}
          <common.SidePanel openPanel={EventsPanel} setPanel={setEventsPanel} anchor="right" width="50vw">
            <RecommendationCard setRefetchUser={setRefetchUser} />
          </common.SidePanel>
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
      {memberPopup && <AddMember memberPopup={memberPopup} setMemberPopup={setMemberPopup} addMemberChannelId={addMemberChannelId} />}{' '}
    </>
  )
}

export { Dashboard }
