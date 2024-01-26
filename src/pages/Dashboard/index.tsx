import { Grid, Box, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Toast } from 'components/common/Toast/Toast'
import { AddMember } from 'pages/Channels/AddMember'
import { CreateChannel } from 'pages/Channels/CreateChannel'
import { Setting } from 'pages/Setting'
import qs from 'qs'
import React, { useState, useEffect, useMemo } from 'react'
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
  const [editChannelData, setEditChannelData] = useState<any>(null)
  const navItems = {
    settings: [
      {
        header: 'Settings',
        items: [{ url: 'settings', label: 'Profile', icon: 'Person2' }]
      }
    ],
    channels: [
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
  }
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
  const [popups, setPopups] = useState({ member: false, channel: false, archiveChannel: false, removeMember: false })

  const [addMemberChannelId, setAddMemberChannelId] = useState(null)

  const handlePortalChange = (newPortal: any, channelId: number) => {
    if (newPortal === 'createChannel') {
      setPopups((prev) => ({ ...prev, ['channel']: true }))

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
    } else if (['find', 'library', 'settings'].includes(portal)) {
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
    library: libraryId ? <IndividualLibrary /> : <Library />,
    settings: <Setting />
  }

  const mainContent = portalComponents[portal]
  const managePopups = (popupName) => {
    setPopups((prev) => ({ ...prev, [popupName]: !popups[popupName] }))
  }
  const archiveChannelFn = async (channel_id) => {
    const channelArchives = await ApiCall(`channels/${channel_id}`, null, 'DELETE')

    if (channelArchives) {
      Toast(`Channel Archived Successfully`)
      setRefetchUser((old) => !old)
      managePopups('archiveChannel')
    }
  }
  const handleChannelsMore = (item, content) => {
    if (item === 'Manage Members') {
      managePopups('member')
      setAddMemberChannelId(content?.id)
    } else if (item === 'Edit Channel') {
      managePopups('channel')
      setEditChannelData(content)
    } else if (item === 'Archive Channel') {
      setAddMemberChannelId(content?.id)
      managePopups('archiveChannel')
    }
  }

  return layout === 404 ? null : (
    <>
      <ResponsiveAppBar setPanel={setPanel} setEventsPanel={setEventsPanel} Panel={Panel} isBelowLG={isBelowLG} />
      <Box component="main" sx={containerStyles}>
        <Grid container spacing={2}>
          {!isBelowLG ? (
            <Grid item xs={12} sm={sideMenuSize}>
              <SideMenuCard
                onPortalChange={handlePortalChange}
                navItems={navItems[portal === 'settings' ? 'settings' : 'channels']}
                setRefetchUser={setRefetchUser}
                handleChannelsMore={handleChannelsMore}
              />
            </Grid>
          ) : (
            <common.SidePanel openPanel={Panel} setPanel={setPanel} anchor="left">
              <SideMenuCard
                onPortalChange={handlePortalChange}
                navItems={navItems[portal === 'settings' ? 'settings' : 'channels']}
                setPanel={setPanel}
                handleChannelsMore={handleChannelsMore}
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
      {popups.channel && (
        <common.Popup
          openPopup={popups.channel}
          popupName="channel"
          setPopups={setPopups}
          onClose={() => setEditChannelData(null)}
          width={'sm'}
          title={'Create Channel'}
          subTitle={'Please add the name to channel and create to continue. Once added you can invite members to your channel'}
        >
          <CreateChannel
            setPopups={setPopups}
            setRefetchUser={setRefetchUser}
            editChannelData={editChannelData}
            setEditChannelData={setEditChannelData}
          />
        </common.Popup>
      )}
      {popups.member && (
        <AddMember popups={popups} managePopups={managePopups} setPopups={setPopups} addMemberChannelId={addMemberChannelId} />
      )}
      {popups.archiveChannel && (
        <common.Popup
          openPopup={popups.archiveChannel}
          popupName="archiveChannel"
          setPopups={setPopups}
          width={'sm'}
          submitBtnLabel="Confirm"
          submitHandler={() => archiveChannelFn(addMemberChannelId)}
        ></common.Popup>
      )}
    </>
  )
}

export { Dashboard }
