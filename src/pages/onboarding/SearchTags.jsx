import ClearIcon from '@mui/icons-material/Clear'
import { Chip, Box, Container } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import React, { memo, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Controls as common } from '../../components/common'
import { commonStyles } from '../../styles/commonStyles'
import { ApiCall, encodeParams } from '../../utils'

function SearchTagsComponent({
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
    const fetchedTags = await ApiCall(apiUrl)

    return fetchedTags
  }

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isSuccess, isError } = useInfiniteQuery({
    queryKey: [queryKey, searchText], // Dynamic query key
    queryFn: ({ pageParam = 1 }) => fetchTags({ pageParam }, searchText),
    getNextPageParam: (lastPage) => lastPage?.next
  })

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
    <Box className="col-center gap-1">
      <Container maxWidth="sm" style={{ width: '600px' }}>
        <common.Input
          placeholder={placeholder}
          value={searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))}
          customHandleClearClick={() => dispatch(setSearchText(''))}
          startIcon="Search"
          endIcon={true}
        />
      </Container>
      <common.InfiniteQueryWrapper
        isSuccess={isSuccess}
        isError={isError}
        data={data}
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
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

export const SearchTags = memo(SearchTagsComponent)
