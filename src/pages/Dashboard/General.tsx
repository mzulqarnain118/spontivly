import { Grid, Box } from '@mui/material'
import React, { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ApiCall, encodeParams } from 'utils'
import { Controls as common } from '../../components/common'
import { CreatePostCard } from '../Channels/CreatePostCard'
import { PostsCard } from '../Channels/PostsCard'

function General() {
  const { channelId } = useParams()
  const [editPost, setEditPost] = useState<boolean>(false)
  const [editPostData, setEditPostData] = useState<any>(null)
  const currentUser = useSelector((state: any) => state?.dashboard?.currentUser)
  const role = currentUser?.user?.groups?.[0]?.name ?? ''

  async function fetchPosts({ pageParam = 1 }) {
    const queryParams = {
      page: pageParam,
      channel: channelId
    }
    const encodedPostsParams = encodeParams(queryParams)
    const apiUrl = `posts/?${encodedPostsParams}`

    return ApiCall(apiUrl)
  }

  const {
    data: fetchedPosts,
    refetch,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery(
    ['posts', channelId], // Dynamic query key
    ({ pageParam = 1 }) => fetchPosts({ pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage?.next,
      enabled: !!channelId // Enable the query only when channelId is truthy
    }
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {role === 'Moderator' && (
          <Grid container item>
            <common.Popup openPopup={editPost} setPopup={setEditPost} title={'Edit Post'}>
              <CreatePostCard refetch={refetch} isEditing={true} setEditPost={setEditPost} postDataToEdit={editPostData} />
            </common.Popup>
            {!editPost && <CreatePostCard refetch={refetch} />}
          </Grid>
        )}
        <Grid container item>
          <common.InfiniteQueryWrapper
            status={status}
            data={fetchedPosts}
            error={error}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isFetching={isFetching}
            noDataText="No Posts Available"
          >
            {(posts) =>
              posts?.map((post) => (
                <PostsCard key={post?.title} setEditPost={setEditPost} setEditPostData={setEditPostData} post={post} refetch={refetch} />
              ))
            }
          </common.InfiniteQueryWrapper>
        </Grid>
      </Grid>
    </Box>
  )
}

export { General }
