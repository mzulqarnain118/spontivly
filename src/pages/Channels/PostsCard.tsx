import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { Toast } from 'components/common/Toast/Toast'
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

const moreOptions = ['Edit Post', 'Delete Post', 'Pin Post', 'Add To Favorites']

interface RootState {
  dashboard: {
    isModerator: boolean
  }
}

function PostsCard({ post, refetch, setEditPost, setEditPostData }) {
  const { isModerator } = useSelector((state: RootState) => state?.dashboard)
  const channelClasses: any = channelStyles()
  const isPDF = post?.attachment?.toLowerCase().endsWith('.pdf')
  const isVideo = ['mp4', 'mov', 'avi'].some((ext) => post?.attachment?.toLowerCase().endsWith(`.${ext}`))
  const [addComment, setAddComment] = useState<any>(null)
  const handleCloseUserMenu = (item, post) => {
    if (item === 'Pin Post') {
      pinPost(post)
    } else if (item === 'Edit Post') {
      setEditPost((old) => !old)
      setEditPostData(post)
    } else if (item === 'Delete Post') {
      deletePost(post?.id)
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
      Toast(`Post ${post?.is_pin ? 'Un-Pinned' : 'Pinned'} Successfully`)
      refetch()
    }
  }

  const unLikePost = async () => {
    const unLikedPost = await ApiCall(`posts/like/${post?.id}`, null, 'DELETE')

    if (unLikedPost) {
      refetch()
    }
  }
  const deletePost = async (postId) => {
    const deletedPost = await ApiCall(`posts/${postId}`, null, 'DELETE')

    if (deletedPost) {
      Toast('Post Deleted Successfully')
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
            {post?.is_pin && <common.MuiIcon name="PushPin" onClick={() => isModerator && handleCloseUserMenu('Pin Post', post)} />}
          </Grid>
          <Grid item xs={1}>
            <common.MenuList
              items={isModerator ? (post?.is_pin ? moreOptions : moreOptions) : moreOptions.slice(3)}
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
            <Typography
              className="cursor"
              variant="body1"
              sx={{ color: 'primary.main' }}
              onClick={() => setAddComment(addComment ? null : post?.id)}
            >
              {post?.comments} Comment
            </Typography>
          </Grid>
        </Grid>
        {addComment === post?.id && (
          <Grid container item spacing={1}>
            <Comments refetchProfile={refetch} post_id={addComment} />
          </Grid>
        )}
      </CardContent>
    </Card>
  )
}

export { PostsCard }
