import { Card, CardContent, Grid, Avatar } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import uploadImgIcon from '../../assets/icons/fi_image.svg'
import pollIcon from '../../assets/icons/u_chart-growth-alt.svg'
import fileIcon from '../../assets/icons/u_paperclip.svg'
import defaultProfile from '../../assets/images/defaultProfile.png'
import { Controls as common } from '../../components/common'
import { channelStyles } from './channelStyles'

const CreatePostCard = () => {
  const classes = channelStyles()
  const currentUser = useSelector((state: any) => state?.dashboard?.currentUser)
  const [selectedButton, setSelectedButton] = useState(null)
  const [description, setDescription] = useState('')
  const [createPostContent, setCreatePostContent] = useState({
    title: ''
  })
  const buttons = [
    { label: 'Upload Image', icon: uploadImgIcon, slug: 'upload-image' },
    { label: 'Upload File', icon: fileIcon, slug: 'upload-file' },
    { label: 'Poll', icon: pollIcon, slug: 'poll' }
  ]

  const handleClick = (slug) => {
    setSelectedButton(slug)
    console.log(`Clicked button with slug: ${slug}`)
  }

  return (
    <Card className={classes.container}>
      <CardContent className="col gap-1">
        <Grid item xs={12} sm={12}>
          <common.Input name="title" placeholder="Title" value={createPostContent.title} listUpdater={setCreatePostContent} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <common.RichText value={description} placeholder="Write here..." onBlur={setDescription} />
        </Grid>
        <div className="row-center">
          {buttons.map(({ label, icon, slug }) => (
            <common.MuiButton
              key={slug}
              variant="plain"
              size="large"
              label={label}
              bgcolor={selectedButton === slug ? '#E9EDF0' : ''}
              startCustomIcon={icon}
              onClick={() => handleClick(slug)}
            />
          ))}
        </div>
        <common.MuiButton variant="contained" size="large" label="Create Post" onClick={() => alert(1)} />
      </CardContent>
    </Card>
  )
}

export { CreatePostCard }
