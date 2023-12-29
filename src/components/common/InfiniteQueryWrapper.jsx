import { Typography, Box } from '@mui/material'
import { memo } from 'react'
import { Controls as common } from '../common'

function InfiniteQuery({ status, error, data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, children }) {
  return (
    <Box
      sx={{
        overflowY: 'auto'
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
          {children(data?.pages?.flatMap((page) => page?.results))}
          {hasNextPage && (
            <common.MuiButton onClick={() => fetchNextPage()} label={isFetchingNextPage ? 'Loading ...' : 'Load More'} size="md" />
          )}
          {isFetching && !isFetchingNextPage && <common.Spinner text="Fetching..." />}
        </>
      )}
    </Box>
  )
}

export const InfiniteQueryWrapper = memo(InfiniteQuery)
