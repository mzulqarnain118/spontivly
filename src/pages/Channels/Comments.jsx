import { Avatar, Grid, Box, Typography } from '@mui/material'
import { Toast } from 'components/common/Toast/Toast'
import moment from 'moment'
import React, { useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { ApiCall, encodeParams } from 'utils'
import Send from '../../assets/icons/send.svg'
import { Controls as common } from '../../components/common'

export function Comments({ refetchPosts, post_id }) {
  const { isModerator, userId } = useSelector((state) => state?.dashboard)
  const [editCommentData, setEditCommentData] = useState(null)
  const [editComment, setEditComment] = useState('')
  const [comment, setComment] = useState('')

  async function fetchPosts({ pageParam = 1 }) {
    const queryParams = {
      page: pageParam,
      post_id
    }
    const encodedCommentsParams = encodeParams(queryParams)
    const apiUrl = `posts/comment/?${encodedCommentsParams}`

    return ApiCall(apiUrl)
  }

  const {
    data: fetchedComments,
    refetch,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isSuccess,
    isError
  } = useInfiniteQuery({
    queryKey: ['posts/comment', post_id], // Dynamic query key
    queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam }),
      getNextPageParam: (lastPage) => lastPage?.next
    }
  )
  const postComment = async () => {
    const payload = {
      post: post_id,
      comment
    }
    const addedComment = await ApiCall('posts/comment/', null, 'POST', payload)

    if (addedComment) {
      refetchPosts()
      refetch()
      setComment('')
    }
  }
  const patchComment = async () => {
    const editedComment = await ApiCall(`posts/comment/${editCommentData?.id}/`, null, 'PATCH', { comment: editComment })

    if (editedComment) {
      Toast(`Comment Edited Successfully`)
      setEditComment('')
      setEditCommentData(null)
      refetchPosts()
      refetch()
    }
  }
  const deleteComment = async (commentId) => {
    const deletedComment = await ApiCall(`posts/comment/${commentId}`, null, 'DELETE')

    if (deletedComment) {
      Toast('Comment Deleted Successfully')
      refetch()
      refetchPosts()
    }
  }

  return (
    <Grid item xs={12}>
      <AddComment setComment={setComment} comment={comment} postComment={postComment} Send={Send} />

      <common.InfiniteQueryWrapper
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={fetchedComments}
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isFetching={isFetching}
        noDataText="No Comments Available"
      >
        {(comments) =>
          comments?.map((comment) => (
            <Grid key={comment?.comment} container item justifyContent="space-between" alignItems="center">
              <Grid item xs={11}>
                <Box className="row gap-1">
                  <Avatar src={comment?.commented_by?.profile?.profile_pic} />
                  {editCommentData?.id === comment?.id ? (
                    <AddComment setComment={setEditComment} comment={editComment} postComment={patchComment} Send={Send} />
                  ) : (
                    <Box className="col-start gap-05">
                      <Box className="row-start gap-05">
                        <Typography variant="author">{comment?.commented_by?.first_name + comment?.commented_by?.last_name}</Typography>
                        <span>about {moment(comment?.created_at).format('HH')} hours ago</span>
                      </Box>
                      <Typography>{comment?.comment}</Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
              {(comment?.commented_by?.id === userId || isModerator) && (
                <Grid item xs={1}>
                  <Box className="row">
                    {comment?.commented_by?.id === userId && (
                      <common.MuiIcon
                        name="Edit"
                        onClick={() => {
                          setEditCommentData(comment)
                          setEditComment(comment?.comment)
                        }}
                      />
                    )}
                    <common.MuiIcon name="Delete" onClick={() => deleteComment(comment?.id)} />
                  </Box>
                </Grid>
              )}
            </Grid>
          ))
        }
      </common.InfiniteQueryWrapper>
    </Grid>
  )
}

function AddComment({ setComment, comment, postComment, Send }) {
  return (
    <Grid container item alignItems="center">
      <Grid item xs={9.8} sm={9.8} md={9.8} lg={10.8}>
        <common.Input valueUpdater={setComment} value={comment} placeholder="Comment" />
      </Grid>
      <Grid
        item
        xs={2}
        sm={2}
        md={2}
        lg={1}
        sx={{
          ml: 1
        }}
      >
        <common.MuiButton variant="contained" size="large" label=" " disabled={comment === ''} onClick={postComment}>
          <common.Img src={Send} />
        </common.MuiButton>
      </Grid>
    </Grid>
  )
}
