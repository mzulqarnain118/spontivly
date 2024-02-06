import { Grid, Box } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Controls as common } from '../../components/common'
import { ApiCall, encodeParams } from '../../utils'
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
    isFetchingNextPage,
    isSuccess,
    isError
  } = useInfiniteQuery({
    queryKey: ['posts', channelId], // Dynamic query key
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.next,
    enabled: !!channelId && channelId !== 'undefined' // Enable the query only when channelId is truthy
  })

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
        {fetchedPosts ? (
          <Grid container item>
            <common.InfiniteQueryWrapper
              isSuccess={isSuccess}
              isError={isError}
              data={fetchedPosts}
              error={error}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              noDataText="No Posts Available"
            >
              {(posts) =>
                posts?.map((post) => (
                  <PostsCard
                    key={post?.id + post?.updated_at}
                    setEditPost={setEditPost}
                    setEditPostData={setEditPostData}
                    post={post}
                    refetch={refetch}
                  />
                ))
              }
            </common.InfiniteQueryWrapper>
          </Grid>
        ):null}
      </Grid>
    </Box>
  )
}

export { General }
