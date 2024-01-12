import { Typography, Grid } from '@mui/material'
import { memo, useMemo } from 'react'
import { Controls as common } from '../common'

function InfiniteQuery({ status, error, data, noDataText, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, children }) {
  const flattenedResults = useMemo(() => data?.pages?.flatMap((page) => page?.results) || [], [data])

  return (
    <Grid
      item
      xs={12}
      sx={{
        // overflowY: 'auto',
        textAlign: 'center'
      }}
    >
      {status === 'loading' && <common.Spinner />}
      {status === 'error' && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Typography variant="subtitle1" color="error">
            Error: {error?.message}
          </Typography>
        </div>
      )}
      {status === 'success' && (
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
