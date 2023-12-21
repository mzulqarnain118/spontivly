import { Card, CardContent, TextField, Button, Grid, Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import img from '../../assets/icons/fi_image.svg'
import poll from '../../assets/icons/u_chart-growth-alt.svg'
import file from '../../assets/icons/u_paperclip.svg'
import defaultProfile from '../../assets/images/defaultProfile.png'

const CreatePostCard = () => {
  const profilePic = useSelector((state) => state.onBoarding.profilePic)

  return (
    <Card sx={{ p: 0, border: '1px solid var(--petroleum-p-15, #E9EDF0)', boxShadow: 'none', borderRadius: '8px' }}>
      <CardContent>
        <Grid container alignItems="center" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item>
            <Avatar src={profilePic ?? defaultProfile}>{/* User Avatar */}</Avatar>
          </Grid>
          <Grid item xs={12} sm={11}>
            <TextField
              label="Start a post"
              multiline
              fullWidth
              variant="outlined"
              InputLabelProps={{
                style: { color: 'var(--petroleum-p-45, #93A5B4)' }
              }}
              sx={{ width: '100%', backgroundColor: 'var(--petroleum-p-05, #F9FBFD)' }}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          startIcon={<img src={img} />}
          variant="plain"
          sx={{
            flex: 1,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'var(--petroleum-p-15, #E9EDF0)',
              borderRadius: '6px'
            }
          }}
        >
          Upload image
        </Button>
        <Button
          startIcon={<img src={file} />}
          variant="plain"
          sx={{
            flex: 1,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'var(--petroleum-p-15, #E9EDF0)',
              borderRadius: '6px'
            }
          }}
        >
          Upload file
        </Button>
        <Button
          startIcon={<img src={poll} />}
          variant="plain"
          sx={{
            flex: 1,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'var(--petroleum-p-15, #E9EDF0)',
              borderRadius: '6px'
            }
          }}
        >
          Poll
        </Button>
      </CardContent>
    </Card>
  )
}

export { CreatePostCard }
