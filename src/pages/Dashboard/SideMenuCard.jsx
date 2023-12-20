import { Avatar, Typography } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Controls as common } from '../../components/common'
import { ApiCall } from '../../utils'

function SideMenuCard({ onPortalChange, setPanel, setRefetchUser, channels }) {
  const { currentUser } = useSelector((state) => state.dashboard)
  const [channelLabel, setChannelLabel] = useState('')
  const unFavorite = async (id) => {
    const response = await ApiCall(`profile/favorite/${id}`, null, 'DELETE')

    if (response) {
      setRefetchUser((old) => !old)
    }
  }
  const handleClick = (url, label) => {
    setChannelLabel(label)
    url != '' && onPortalChange(url, label)
    setPanel(false)
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
          {index == 1 &&
            currentUser[0]?.favorites?.map((user) => (
              <dd className="row-between gap-05" key={user.id}>
                <Avatar src={user?.profile_pic} />
                <Typography color="primary.main">{user.user.first_name}</Typography>
                <common.MuiIcon name={'StarRateRounded'} color="warning.main" onClick={() => unFavorite(user.id)} />
              </dd>
            ))}
          {list.items.map((item) => (
            <dd
              key={item.label}
              className="row-between gap-06 cursor"
              style={{ color: channelLabel === item.label && 'black' }}
              onClick={() => handleClick(item.url, item.label)}
            >
              <common.MuiIcon name={item.icon} />
              <Typography>{item.label}</Typography>
            </dd>
          ))}
        </div>
      ))}
    </dl>
  )
}

export { SideMenuCard }
