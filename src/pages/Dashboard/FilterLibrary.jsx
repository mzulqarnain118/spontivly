import { FormControl, FormGroup, Grid, Box, Typography } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Controls as common } from '../../components/common'
import { ApiCall } from '../../utils'

const FilterLibrary = ({
  isOpen,
  onClose,
  contentTypes,
  selectedTags,
  setSelectedTags,
  selectedTypes,
  setSelectedTypes,
  setApplyFilters
}) => {
  const handleTagClick = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagId))
    } else {
      setSelectedTags([...selectedTags, tagId])
    }
  }
  const fetchTags = async ({ pageParam = 1 }) => {
    return ApiCall(`tags?page=${pageParam}`)
  }
  const {
    data: libraryTags,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSuccess,
    isError
  } = useInfiniteQuery({
    queryKey: 'tags',
    queryFn: ({ pageParam = 1 }) => fetchTags({ pageParam }),
    getNextPageParam: (lastPage) => lastPage?.next
  })

  const handleClear = () => {
    setSelectedTags([])
    setSelectedTypes([])
  }
  const handleTypeSelection = (typeId) => {
    if (selectedTypes.includes(typeId)) {
      setSelectedTypes(selectedTypes.filter((type) => type !== typeId))
    } else {
      setSelectedTypes([...selectedTypes, typeId])
    }
  }

  return (
    <common.Popup
      openPopup={isOpen}
      setPopup={onClose}
      width={'md'}
      title="Filters"
      submitBtnLabel="Apply"
      submitHandler={() => setApplyFilters((old) => !old)}
      handlePopupCancel={handleClear}
      cancelBtnLabel="Clear all"
    >
      <div className="col-start gap-05">
        <Typography variant="h5" align="left">
          Type
        </Typography>
        <Grid container spacing={2}>
          {contentTypes.map((card, index) => (
            <Grid key={index} item xs={6} sm={6} md={6} lg={3}>
              <common.FilterContentTypeCard
                title={card.title}
                img={card.img}
                selected={selectedTypes.includes(card.id)}
                onClick={() => handleTypeSelection(card.id)}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" align="left">
          Tags
        </Typography>
      </div>
      <common.InfiniteQueryWrapper
        isSuccess={isSuccess}
        isError={isError}
        data={libraryTags}
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      >
        {(tags) => (
          <Grid className="grid-container">
            {tags?.map((tag) => (
              <Box key={tag.id}>
                <FormControl component="fieldset" variant="standard">
                  <FormGroup>
                    <common.CheckboxGroup
                      label={tag.title}
                      key={tag.id}
                      name={tag.name}
                      size="large"
                      onChange={() => handleTagClick(tag.id)}
                      value={selectedTags.includes(tag.id) || false}
                    />
                  </FormGroup>
                </FormControl>
              </Box>
            ))}
          </Grid>
        )}
      </common.InfiniteQueryWrapper>
    </common.Popup>
  )
}

export { FilterLibrary }
