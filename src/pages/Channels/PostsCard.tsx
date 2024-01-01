import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ApiCall, handleOpenUrlInNewTab } from 'utils'
import commentIcon from '../../assets/icons/comment.svg'
import like from '../../assets/icons/like.svg'
import Send from '../../assets/icons/send.svg'
import fileIcon from '../../assets/icons/u_paperclip.svg'
import profile from '../../assets/images/profile.jpg'
import { Controls as common } from '../../components/common'
import { dashboardStyles } from '../../styles/components/dashboardStyles'
import { channelStyles } from './channelStyles'
import { DisplayPoll } from './DisplayPoll'
const moreOptions = ['', '', '']

function PostsCard({ post, refetch }) {
  const channelClasses: any = channelStyles()

  const classes: any = dashboardStyles()
  const isPDF = post?.attachment?.toLowerCase().endsWith('.pdf')
  const isVideo = ['mp4', 'mov', 'avi'].some((ext) => post?.attachment?.toLowerCase().endsWith(`.${ext}`))
  const [addComment, setAddComment] = useState<any>(false)
  const [comment, setComment] = useState<any>('')
  const [handleMore, setHandleMore] = useState<any>(null)
  const handleCloseUserMenu = (item) => {
    if (item) {
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
  const postComment = async () => {
    const payload = {
      post: post?.id,
      comment
    }
    const addedComment = await ApiCall('posts/comment/', null, 'POST', payload)

    if (addedComment) {
      refetch()
      setAddComment((old) => !old)
    }
  }
  const unLikePost = async () => {
    const unLikedPost = await ApiCall(`posts/like/${post?.id}`, null, 'DELETE')

    if (unLikedPost) {
      refetch()
    }
  }

  return (
    <>
      <Card className={`${channelClasses.container} mb-1`}>
        <Grid>
          <CardContent className="col-start gap-05">
            <Grid container className={`row-between ${classes.content}`}>
              <Grid item xs={8} md={4} lg={4}>
                <Box className="row gap-1">
                  <Avatar src={post?.created_by?.profile?.profile_pic ?? profile} />
                  <Box className="col-start gap-05">
                    <Typography variant="author">{post?.created_by?.first_name + post?.created_by?.last_name}</Typography>
                    <Typography variant="lighterSubtitle2">{post?.created_by?.profile?.company_name}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={1} md={1} lg={1} onClick={() => setHandleMore(post)}>
                <common.MenuList items={moreOptions} onClose={handleCloseUserMenu} icon="MoreHorizRounded" tooltip="Open settings" />
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
            )}{' '}
            {post?.choices?.length !== 0 && (
              <Grid item xs={12} md={12} lg={12}>
                <DisplayPoll choices={post?.choices} postId={post?.id} refetch={refetch} />
              </Grid>
            )}
            <Divider />
            <Grid container justifyContent="space-between">
              <Grid item>
                <Box className="flex">
                  {post?.likes > 0 ? (
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
                    onClick={() => setAddComment((old) => !old)}
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
          </CardContent>
        </Grid>
      </Card>
      {/* {addComment && (
        <Grid container className={`row`}>
          <Grid item xs={10} md={10} lg={10}>
            <common.Input valueUpdater={setComment} value={comment} placeholder="Comment" />
          </Grid>
          <Grid item xs={2} md={2} lg={2}>
            <common.MuiButton
              variant="contained"
              size="md"
              label=""
              disabled={comment === ''}
              startIcon={<common.Img src={Send} />}
              onClick={postComment}
            />
          </Grid>
        </Grid>
      )} */}
    </>
  )
}

export { PostsCard }
