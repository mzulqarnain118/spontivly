import { Typography, Grid } from '@mui/material'
import { memo, useMemo, useEffect } from 'react'
import { Controls as common } from '../common'

function InfiniteQuery({
  isLoading,
  isSuccess,
  isError,
  error,
  data,
  noDataText,
  fetchNextPage,
  setCount,
  hasNextPage,
  isFetchingNextPage,
  isFetching,
  children
}) {
  const flattenedResults = useMemo(() => data?.pages?.flatMap((page) => page?.results) || [], [data])
  const totalCount = useMemo(() => data?.pages?.[0]?.count || 0, [data])

  useEffect(() => {
    setCount && setCount(totalCount)
  }, [totalCount])

  return (
    <Grid
      item
      xs={12}
      sx={{
        // overflowY: 'auto',
        textAlign: 'center'
      }}
    >
      {isLoading && <common.Spinner />}
      {isError && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Typography variant="subtitle1" color="error">
            Error: {error?.message}
          </Typography>
        </div>
      )}
      {isSuccess && (
        <>
          {flattenedResults.length === 0 ? <Typography>{noDataText ?? 'Records not found.'}</Typography> : children(flattenedResults)}
          {hasNextPage && (
            <common.MuiButton onClick={() => fetchNextPage()} label={isFetchingNextPage ? 'Loading ...' : 'Load More'} size="md" />
          )}
          {isFetching && !isFetchingNextPage && <common.Spinner text="Fetching..." />}
        </>
      )}
    </Grid>
  )
}

export const InfiniteQueryWrapper = memo(InfiniteQuery)
