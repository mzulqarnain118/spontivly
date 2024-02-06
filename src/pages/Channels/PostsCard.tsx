import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import commentIcon from '../../assets/icons/comment.svg'
import fileIcon from '../../assets/icons/u_paperclip.svg'
import profile from '../../assets/images/profile.jpg'
import { Controls as common } from '../../components/common'
import { Toast } from '../../components/common/Toast/Toast'
import { ApiCall, handleOpenUrlInNewTab, isImageFile } from '../../utils'
import { channelStyles } from './channelStyles'
import { Comments } from './Comments'
import { DisplayPoll } from './DisplayPoll'

const moreOptions = ['Edit Post', 'Delete Post']

interface RootState {
  dashboard: {
    isModerator: boolean
    userId: number
  }
}

function PostsCard({ post, refetch, setEditPost, setEditPostData }) {
  const filteredMoreOptions = [
    ...moreOptions,
    post?.is_pin ? 'Un-Pin Post' : 'Pin Post',
    post?.my_favorite ? 'Remove from Favorites' : 'Add To Favorites'
  ]

  const { isModerator, userId } = useSelector((state: RootState) => state?.dashboard)

  if (isModerator && !post?.is_closed && post?.choices?.length !== 0) {
    filteredMoreOptions.push('Close Poll')
  }

  const channelClasses: any = channelStyles()
  const [addComment, setAddComment] = useState<any>(null)

  const handleCloseUserMenu = (item, post) => {
    if (['Pin Post', 'Un-Pin Post'].includes(item)) {
      pinPost(post)
    } else if (item === 'Edit Post') {
      setEditPost((old) => !old)
      setEditPostData(post)
    } else if (item === 'Delete Post') {
      deletePost(post?.id)
    } else if (item === 'Add To Favorites') {
      favPost(post?.id)
    } else if (item === 'Remove from Favorites') {
      UnFavPost(post?.id)
    } else if (item === 'Close Poll') {
      closePoll(post?.id)
    }
  }

  useEffect(() => {}, [post?.attachment])

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

    const pinedPost = await ApiCall(`posts/${post?.id}/`, null, 'PATCH', { data: JSON.stringify(payload) })

    if (pinedPost) {
      Toast(`Post ${post?.is_pin ? 'Un-Pinned' : 'Pinned'} Successfully`)
      refetch()
    }
  }
  const closePoll = async (postId) => {
    const payload = {
      is_closed: true
    }

    const closePoll = await ApiCall(`posts/${postId}/`, null, 'PATCH', { data: JSON.stringify(payload) })

    if (closePoll) {
      Toast(`Poll Closed Successfully`)
      refetch()
    }
  }
  const favPost = async (post_id) => {
    const payload = {
      post_id
    }

    const favoritePost = await ApiCall(`posts/favorite/`, null, 'POST', payload)

    if (favoritePost) {
      Toast(`Post Added to Favorites Successfully`)
      refetch()
    }
  }
  const UnFavPost = async (post_id) => {
    const unFavoritePost = await ApiCall(`posts/favorite/${post_id}`, null, 'DELETE')

    if (unFavoritePost) {
      Toast(`Post Rmoved from Favorites Successfully`)
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
    <Card key={post?.id + post?.updated_at} className={`${channelClasses.container} mb-1`}>
      <CardContent className="col-start gap-05">
        <Grid container item justifyContent="space-between">
          <Grid item xs={9}>
            <Box className="row gap-1">
              <Avatar src={post?.created_by?.profile?.profile_pic ?? profile} />
              <Box className="col-start gap-05">
                <Typography variant="author">{post?.created_by?.first_name + post?.created_by?.last_name}</Typography>
                <Typography variant="lighterSubtitle2">{post?.created_by?.profile?.company_name}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1}>
            {post?.my_favorite && <common.MuiIcon name="StarRateRounded" color="warning.main" onClick={() => UnFavPost(post?.id)} />}
          </Grid>
          <Grid item xs={1}>
            {post?.is_pin && <common.MuiIcon name="PushPin" onClick={() => isModerator && handleCloseUserMenu('Pin Post', post)} />}
          </Grid>
          <Grid item xs={1}>
            <common.MenuList
              items={isModerator && post?.created_by?.id === userId ? filteredMoreOptions : filteredMoreOptions.slice(3)}
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
            {!isImageFile(post?.attachment) ? (
              <Grid className="row cursor" onClick={() => handleOpenUrlInNewTab(post?.attachment)}>
                <common.Img src={fileIcon} />
                {post?.attachment?.split('post/')[1]}
              </Grid>
            ) : (
              <>
                <common.Img className={channelClasses.postThumbnail} src={post?.attachment} />
              </>
            )}
          </>
        )}

        {post?.choices?.length !== 0 && (
          <Grid container item rowSpacing={1} className={post?.is_closed && 'disabled'}>
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
              Comments
            </Typography>
          </Grid>
        </Grid>
        {addComment === post?.id && (
          <Grid container item spacing={1}>
            <Comments refetchPosts={refetch} post_id={addComment} />
          </Grid>
        )}
      </CardContent>
    </Card>
  )
}

export { PostsCard }
