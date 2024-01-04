import { Avatar, Grid, Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import { ApiCall, encodeParams } from 'utils'
import Send from '../../assets/icons/send.svg'
import { Controls as common } from '../../components/common'

export function Comments({ refetchProfile, post_id }) {
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
    status
  } = useInfiniteQuery(
    ['posts/comment', post_id], // Dynamic query key
    ({ pageParam = 1 }) => fetchPosts({ pageParam }),
    {
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
      refetchProfile()
      refetch()
      setComment('')
    }
  }

  return (
    <Grid item xs={12}>
      <Grid container item>
        <Grid item xs={10}>
          <common.Input valueUpdater={setComment} value={comment} placeholder="Comment" />
        </Grid>
        <Grid item xs={2}>
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

      <common.InfiniteQueryWrapper
        status={status}
        data={fetchedComments}
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isFetching={isFetching}
      >
        {(comments) =>
          comments?.map((comment) => (
            <Grid key={comment?.id} container item>
              <Grid item xs={11}>
                <Box className="row gap-1">
                  <Avatar src={comment?.commented_by?.profile?.profile_pic} />
                  <Box className="col-start gap-05">
                    <Typography variant="author">{comment?.commented_by?.first_name + comment?.commented_by?.last_name}</Typography>
                    <Typography>{comment?.comment}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box className="row">
                  <common.MuiIcon name="Edit" />
                  <common.MuiIcon name="Delete" />
                </Box>
              </Grid>
            </Grid>
          ))
        }
      </common.InfiniteQueryWrapper>
    </Grid>
  )
}
