import { Avatar, Typography, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Controls as common } from '../../components/common'
import { ApiCall } from '../../utils'

const moreOptions = ['Manage Members']

function SideMenuCard({ onPortalChange, setPanel, handleChannelsMore, refetchUser, navItems }) {
  const { portal, channelId } = useParams()

  const currentUser = useSelector((state) => state?.dashboard?.currentUser)
  const { isModerator, userId } = useSelector((state) => state?.dashboard)
  const filterMoreOptions = (createdUserId) => {
    const filteredMoreOptions = [...moreOptions, 'Edit Channel', 'Archive Channel']

    return isModerator && createdUserId === userId ? filteredMoreOptions : moreOptions
  }
  const [selectedChannelId, setSelectedChannelId] = useState()

  const unFavorite = async (id) => {
    const response = await ApiCall(`profile/favorite/${id}`, null, 'DELETE')

    if (response) {
      refetchUser()
    }
  }

  useEffect(() => {
    channelId && setSelectedChannelId(channelId)
  }, [channelId])

  const handleClick = (url, channelId) => {
    channelId && setSelectedChannelId(channelId)
    url != '' && onPortalChange(url, channelId)
    setPanel && setPanel(false)
  }

  return (
    <dl
      className="col-start gap-2"
      style={{
        color: '#698296'
      }}
    >
      {navItems?.map((list, index) => (
        <div key={list?.header} className="col-start gap-2">
          <dt>{list?.header}</dt>
          {index == 0 &&
            portal !== 'settings' &&
            currentUser?.channels?.map((channal) => (
              <dd
                className="align-between cursor"
                key={channal?.id}
                style={{ color: selectedChannelId == channal?.id && 'black' }}
                onClick={() => handleClick('channels', channal?.id)}
              >
                <Grid item sx={11} className="row gap-05">
                  <common.MuiIcon name={channal?.is_private ? 'Lock' : 'Tag'} />
                  <Typography>{channal?.name}</Typography>
                </Grid>
                {isModerator && (
                  <Grid item sx={1}>
                    <common.MenuList
                      items={filterMoreOptions(userId)}
                      onClose={(item) => handleChannelsMore(item, channal)}
                      icon="MoreVert"
                      tooltip="Manage Channels"
                    />
                  </Grid>
                )}
              </dd>
            ))}
          {index == 1 &&
            portal !== 'settings' &&
            currentUser?.favorites?.map((user) => (
              <dd className="row-between gap-05 cursor" key={user?.user?.first_name}>
                <Avatar src={user?.profile_pic} />
                <Typography color="primary.main">{user?.user?.first_name ?? ''}</Typography>
                <common.MuiIcon name={'StarRateRounded'} color="warning.main" onClick={() => unFavorite(user?.id)} />
              </dd>
            ))}
          {list?.items?.map(
            (item) =>
              !item?.show && (
                <dd
                  key={item?.label}
                  className="row-between gap-06 cursor"
                  style={{ color: portal === item.url && 'black' }}
                  onClick={() => handleClick(item.url, item.label)}
                >
                  <common.MuiIcon name={item.icon} />
                  <Typography>{item.label}</Typography>
                </dd>
              )
          )}
        </div>
      ))}
    </dl>
  )
}

export { SideMenuCard }
