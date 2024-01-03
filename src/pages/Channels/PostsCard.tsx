import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ApiCall, handleOpenUrlInNewTab } from 'utils'
import commentIcon from '../../assets/icons/comment.svg'
import like from '../../assets/icons/like.svg'
import fileIcon from '../../assets/icons/u_paperclip.svg'
import profile from '../../assets/images/profile.jpg'
import { Controls as common } from '../../components/common'
import { channelStyles } from './channelStyles'
import { Comments } from './Comments'
import { DisplayPoll } from './DisplayPoll'
const moreOptions = ['Edit Post', 'Delete Post', 'Pin Post','Add To Favorites']

function PostsCard({ post, refetch }) {
  const { isModerator } = useSelector((state) => state?.dashboard)
  const channelClasses: any = channelStyles()
  const isPDF = post?.attachment?.toLowerCase().endsWith('.pdf')
  const isVideo = ['mp4', 'mov', 'avi'].some((ext) => post?.attachment?.toLowerCase().endsWith(`.${ext}`))
  const [addComment, setAddComment] = useState<any>(null)
  const handleCloseUserMenu = (item, post) => {
    if (item === 'Pin Post') {
      pinPost(post)
    } else {
      console.log(item)
    }
  }
  const likePost = async () => {
    const payload = {
      post: post?.id
    }
    const likedPost = await ApiCall('posts/like/', null, 'POST', payload)

    if (likedPost) {
      refetch()
    }
  }
  const pinPost = async (post) => {
    const payload = {
      is_pin: !post?.is_pin
    }

    const pinedPost = await ApiCall(`posts/${post?.id}/`, null, 'PATCH', payload)

    if (pinedPost) {
      refetch()
    }
  }

  const unLikePost = async () => {
    const unLikedPost = await ApiCall(`posts/like/${post?.id}`, null, 'DELETE')

    if (unLikedPost) {
      refetch()
    }
  }

  return (
    <Card className={`${channelClasses.container} mb-1`}>
      <CardContent className="col-start gap-05">
        <Grid container item justifyContent="space-between">
          <Grid item xs={10}>
            <Box className="row gap-1">
              <Avatar src={post?.created_by?.profile?.profile_pic ?? profile} />
              <Box className="col-start gap-05">
                <Typography variant="author">{post?.created_by?.first_name + post?.created_by?.last_name}</Typography>
                <Typography variant="lighterSubtitle2">{post?.created_by?.profile?.company_name}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1}>
            {post?.is_pin && <common.MuiIcon name="PushPin" onClick={() => handleCloseUserMenu("Pin Post", post)} />}
          </Grid>
          <Grid item xs={1}>
            <common.MenuList
              items={isModerator ? moreOptions : moreOptions.slice(3)}
              onClose={(e) => handleCloseUserMenu(e, post)}
              icon="MoreHorizRounded"
              tooltip="Open settings"
            />
          </Grid>
        </Grid>
        <Typography variant="h5">{post?.title}</Typography>
        <Typography textAlign="start" sx={{ color: 'text.secondary' }}>
          {post?.description}
        </Typography>
        {post?.attachment && (
          <>
            {isPDF || isVideo ? (
              <div className="row cursor" onClick={() => handleOpenUrlInNewTab(post?.attachment)}>
                <common.Img src={fileIcon} />
                {post?.attachment?.split('post/')[1]}
              </div>
            ) : (
              <common.Img className={channelClasses.postThumbnail} src={post?.attachment} />
            )}
          </>
        )}
        {post?.choices?.length !== 0 && (
          <Grid container item rowSpacing={1}>
            <DisplayPoll choices={post?.choices} postId={post?.id} refetch={refetch} />
          </Grid>
        )}
        <Divider />
        <Grid container justifyContent="space-between">
          <Grid item>
            <Box className="flex">
              {post?.i_liked > 0 ? (
                <common.MuiIcon name="ThumbUpAlt" color="primary.lighter" onClick={() => unLikePost()} />
              ) : (
                <common.MuiIcon name="ThumbUpOffAlt" color="primary.lighter" onClick={() => likePost()} />
              )}
              {/* <common.Img src={like} sx={{ marginRight: '11px' }} /> */}
              <Typography variant="body1" sx={{ color: 'primary.main', marginRight: '20px' }}>
                {post?.likes} Likes
              </Typography>
              <common.Img className="cursor" src={commentIcon} sx={{ marginRight: '11px' }} />
              <Typography
                className="cursor"
                variant="body1"
                sx={{ color: 'primary.main' }}
                onClick={() => setAddComment(addComment ? null : post?.id)}
              >
                Comment
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Typography variant="body1" sx={{ color: 'primary.main' }}>
              {post?.comments} Comment
            </Typography>
          </Grid>
        </Grid>
        {addComment === post?.id && (
          <Grid container item spacing={1}>
            <Comments refetchProfile={refetch} setAddComment={setAddComment} post_id={addComment} />{' '}
          </Grid>
        )}
      </CardContent>
    </Card>
  )
}

export { PostsCard }
