import React, { useCallback, useEffect } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { Chip, Box, Container } from '@mui/material'
import { useDispatch } from 'react-redux'
import commonStyles from '../../styles/commonStyles'
import common from '../../components/common'
import { useInfiniteQuery } from 'react-query'
import { ApiCall, encodeParams } from 'utils'

function SearchTags({
  addSelectedChip,
  removeSelectedChip,
  selectedChips,
  searchText,
  queryKey,
  filterChipData,
  setSearchText,
  setChipData,
  placeholder
}) {
  const dispatch = useDispatch()
  const classes = commonStyles()
  async function fetchTags({ pageParam = 1 }, searchText) {
    const queryParams = {
      page: pageParam,
      name: searchText
    }
    const encodedTagParams = encodeParams(queryParams)
    const apiUrl = `${queryKey}?${encodedTagParams}`
    return await ApiCall(apiUrl)
  }
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery(
    [queryKey, searchText], // Dynamic query key
    ({ pageParam = 1 }) => fetchTags({ pageParam }, searchText),
    {
      getNextPageParam: (lastPage) => lastPage?.next
    }
  )
  useEffect(() => {
    data && dispatch(setChipData(data?.pages?.flatMap((page) => page?.results)))
  }, [data])

  const handleAddToSelectedChips = useCallback(
    (chipToAdd) => () => {
      if (!selectedChips.find((chip) => chip.id === chipToAdd.id)) {
        dispatch(addSelectedChip(chipToAdd))
      }
    },
    [selectedChips]
  )

  const handleRemoveFromSelectedChips = useCallback((chipToRemove) => () => {
    dispatch(removeSelectedChip(chipToRemove))
  })

  return (
    <Box className="col-start gap-1">
      <Container maxWidth="sm" className={classes.container}>
        <Box className={classes.mainContainer}>
          <common.Input
            placeholder={placeholder}
            value={searchText}
            onChange={(e) => dispatch(setSearchText(e.target.value))}
            customHandleClearClick={() => dispatch(setSearchText(''))}
            startIcon={true}
            endIcon={true}
          />
        </Box>
      </Container>
      <common.InfiniteQueryWrapper
        status={status}
        data={data}
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isFetching={isFetching}
      >
        {(tags) => (
          <>
            <Container className={classes.chipContainer}>
              {selectedChips.map((data, index) => (
                <Chip
                  key={data.id}
                  label={data.title}
                  size="medium"
                  onDelete={handleRemoveFromSelectedChips(data)}
                  deleteIcon={<ClearIcon />}
                  className={classes.selectedChip}
                />
              ))}
            </Container>
            <Container className={classes.selectedchipContainer}>
              {filterChipData.map((data, index) => (
                <Chip key={data.id} label={data.title} onClick={handleAddToSelectedChips(data)} className={classes.chip} />
              ))}
            </Container>
          </>
        )}
      </common.InfiniteQueryWrapper>
    </Box>
  )
}

export default React.memo(SearchTags)
