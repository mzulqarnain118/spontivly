import { Grid } from '@mui/material'
import React from 'react'
import { useInfiniteQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { ApiCall, encodeParams } from 'utils'
import { Controls as common } from '../../components/common'
import { CreatePostCard } from '../Channels/CreatePostCard'
import { PostsCard } from '../Channels/PostsCard'

function General() {
  const currentUser = useSelector((state: any) => state?.dashboard?.currentUser)
  const role = currentUser?.user?.groups?.[0]?.name ?? ''

  async function fetchPosts({ pageParam = 1 }) {
    const queryParams = {
      page: pageParam,
      channel: 2
    }
    const encodedPostsParams = encodeParams(queryParams)
    const apiUrl = `posts/?${encodedPostsParams}`

    return ApiCall(apiUrl)
  }

  const {
    data: fetchedPosts,
    refetch,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery(
    ['posts'], // Dynamic query key
    ({ pageParam = 1 }) => fetchPosts({ pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage?.next
    }
  )

  return (
    <Grid>
      {role === 'Moderator' && (
        <Grid className="mb-1">
          <CreatePostCard refetch={refetch} />
        </Grid>
      )}
      <Grid>
        <common.InfiniteQueryWrapper
          status={status}
          data={fetchedPosts}
          error={error}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isFetching={isFetching}
        >
          {(posts) => posts?.map((post) => <PostsCard key={post?.id} post={post} />)}
        </common.InfiniteQueryWrapper>
      </Grid>
    </Grid>
  )
}

export { General }
