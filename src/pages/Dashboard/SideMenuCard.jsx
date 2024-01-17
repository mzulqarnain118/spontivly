import { Avatar, Typography, Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Controls as common } from '../../components/common'
import { ApiCall } from '../../utils'
import { useParams } from 'react-router-dom'

const moreOptions = ['Manage Members']

function SideMenuCard({ onPortalChange, setPanel, setRefetchUser, channels, setMemberPopup }) {
    const { portal } = useParams()
  const currentUser = useSelector((state) => state?.dashboard?.currentUser)
    const role = currentUser?.user?.groups?.[0]?.name ?? ''
    const isModerator = role === 'Moderator'
  const [channelLabel, setChannelLabel] = useState(portal)
  const unFavorite = async (id) => {
    const response = await ApiCall(`profile/favorite/${id}`, null, 'DELETE')

    if (response) {
      setRefetchUser((old) => !old)
    }
  }

  useEffect(() => {
    if (currentUser) {
      setChannelLabel(currentUser?.channels?.[0]?.name)
    }
  }, [currentUser])

  const handleClick = (url, label, channelId) => {
    setChannelLabel(label)
    url != '' && onPortalChange(url, channelId)
    setPanel && setPanel(false)
  }

  const handleCloseUserMenu = (item) => {
    if (item === 'Manage Members') {
      setMemberPopup((old) => !old)
    }
  }

  return (
    <dl
      className="col-start gap-2"
      style={{
        color: '#698296'
      }}
    >
      {channels.map((list, index) => (
        <div key={list.header} className="col-start gap-2">
          <dt>{list.header}</dt>
          {index == 0 &&
            currentUser?.channels?.map((channal) => (
              <dd
                className="align-between cursor"
                key={channal?.id}
                style={{ color: channelLabel === channal?.name && 'black' }}
                onClick={() => handleClick('channels', channal?.name, channal?.id)}
              >
                <Grid item sx={11} className="row gap-05">
                  <common.MuiIcon name={channal?.is_private ? 'Lock' : 'Tag'} />
                  <Typography>{channal?.name}</Typography>
                </Grid>
                {isModerator && (
                  <Grid item sx={1}>
                    <common.MenuList items={moreOptions} onClose={handleCloseUserMenu} icon="MoreVert" tooltip="Manage Channels" />
                  </Grid>
                )}
              </dd>
            ))}
          {index == 1 &&
            currentUser?.favorites?.map((user) => (
              <dd className="row-between gap-05 cursor" key={user.id}>
                <Avatar src={user?.profile_pic} />
                <Typography color="primary.main">{user.user.first_name}</Typography>
                <common.MuiIcon name={'StarRateRounded'} color="warning.main" onClick={() => unFavorite(user.id)} />
              </dd>
            ))}
          {list.items.map(
            (item) =>
              !item?.show && (
                <dd
                  key={item.label}
                  className="row-between gap-06 cursor"
                  style={{ color: channelLabel === item.label && 'black' }}
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
