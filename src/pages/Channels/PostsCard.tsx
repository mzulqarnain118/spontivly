import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import comment from '../../assets/icons/comment.svg'
import like from '../../assets/icons/like.svg'
import atom from '../../assets/images/atom.png'
import profile from '../../assets/images/profile.jpg'
import { Controls as common } from '../../components/common'
import { dashboardStyles } from '../../styles/components/dashboardStyles'
import { channelStyles } from './channelStyles'
const moreOptions = ['', '', '']

function PostsCard({ post }) {
  const channelClasses: any = channelStyles()
  const classes: any = dashboardStyles()
  const [handleMore, setHandleMore] = useState<any>(null)
  const handleCloseUserMenu = (item) => {
    if (item) {
    } else {
      console.log(item)
    }
  }

  return (
    <Card className={`${channelClasses.container} mt-1`}>
      <CardContent className="col-start gap-05">
        <Grid container className={`row-between ${classes.content}`}>
          <Grid item xs={8} md={4} lg={4}>
            <Box className="row gap-1">
              <Avatar src={post?.profile_pic ?? profile} />
              <Box className="col-start gap-05">
                <Box className="row-start gap-05">
                  <Typography variant="author">{post.name}</Typography>
                </Box>
                <Typography variant="lighterSubtitle2">{post.companyName}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} md={1} lg={1} onClick={() => setHandleMore(post)}>
            <common.MenuList items={moreOptions} onClose={handleCloseUserMenu} icon="MoreHorizRounded" tooltip="Open settings" />
          </Grid>
        </Grid>
        <Typography variant="h5">{post.title}</Typography>
        <Typography textAlign="start" sx={{ color: 'text.secondary' }}>
          {post.description}
        </Typography>
        <common.Img src={atom} />
        <Divider />
        <Grid container justifyContent="space-between">
          <Grid item>
            <Box className="flex">
              <common.Img src={like} sx={{ marginRight: '11px' }} />
              <Typography variant="body1" sx={{ color: 'primary.main', marginRight: '20px' }}>
                0 Likes
              </Typography>
              <common.Img src={comment} sx={{ marginRight: '11px' }} />
              <Typography variant="body1" sx={{ color: 'primary.main' }}>
                Comment
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Typography variant="body1" sx={{ color: 'primary.main' }}>
              0 Comment
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export { PostsCard }
