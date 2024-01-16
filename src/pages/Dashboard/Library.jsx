import AddIcon from '@mui/icons-material/Add'
import { Card, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import { useSelector } from 'react-redux'
import doc from '../../assets/icons/doc.png'
import filter from '../../assets/icons/filter.svg'
import link from '../../assets/icons/link.png'
import pdf from '../../assets/icons/pdf.png'
import youtube from '../../assets/icons/youtube.png'
import youtubeText from '../../assets/icons/youtubeText.png'
import { Controls as common } from '../../components/common'
import { ToggleButtons } from '../../components/common/ToggleButtons'
import { dashboardStyles } from '../../styles/components/dashboardStyles'
import { ApiCall, encodeParams } from '../../utils'
import { BaseButton } from './../../components/common/BaseButton'
import { CreateContent } from './CreateContent'
import { FilterLibrary } from './FilterLibrary'
import { LibraryContent } from './LibraryContent'
import { ModuleView } from './ModuleView'

const contentTypes = [
  {
    id: 'youtube',
    title: 'Youtube',
    img: youtube
  },
  {
    id: 'doc',
    title: 'Document',
    img: doc
  },
  {
    id: 'link',
    title: 'Link',
    img: link
  },
  {
    id: 'pdf',
    title: 'PDF',
    img: pdf
  }
]

const sortByData = [{ id: 'Most Recent', title: 'Most Recent' }]

export const typeIcons = { youtube: youtubeText, doc: doc, link: link, pdf: pdf }
const moreOptions = ['Edit Content', 'Delete Content', 'Publish Content', 'UnPublish Content', 'Save For Later']

function Library() {
  const { isModerator } = useSelector((state) => state?.dashboard)
  const filteredMoreOptions = isModerator ? moreOptions : moreOptions.slice(4)
  const [view, setView] = useState('list')
  const [selectedTags, setSelectedTags] = useState([])
  const [applyFilters, setApplyFilters] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState([])
  const [isContentDialogOpen, setContentDialogOpen] = useState(false)
  const [isFilterDialogOpen, setFilterDialogOpen] = useState(false)
  const [libraryContent, setLibraryContent] = useState({
    content: '',
    sortBy: null,
    newLibraryAdded: false
  })

  async function fetchLibraries({ pageParam = 1 }, types, tags, name, sortBy) {
    const queryParams = {
      page: pageParam,
      types,
      tags,
      name,
      sort: sortBy
    }

    const encodedLibraryParams = encodeParams(queryParams, 'brackets')
    const apiUrl = `libraries?${encodedLibraryParams}`

    return ApiCall(apiUrl)
  }

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery(
    ['libraries', libraryContent, applyFilters], // Dynamic query key
    ({ pageParam = 1 }) => fetchLibraries({ pageParam }, selectedTypes, selectedTags, libraryContent.content, libraryContent.sortBy),
    {
      getNextPageParam: (lastPage) => lastPage?.next
    }
  )

  const classes = dashboardStyles()
  const openContentModal = () => {
    setContentDialogOpen(true)
  }
  const closeContentModal = () => {
    setContentDialogOpen(false)
  }
  const openFilterModal = () => {
    setFilterDialogOpen(true)
    setSelectedTags([])
    setSelectedTypes([])
  }
  const closeFilterModal = () => {
    setFilterDialogOpen(false)
  }

  const handleMoreClick = (item, content) => {
    if (item === 'Delete Content') {
      pinPost(post)
    } else if (item === 'Publish Content') {
      setEditPost((old) => !old)
      setEditPostData(post)
    } else {
      console.log(item)
    }
  }

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={6} sm={8} md={9}>
          <Typography variant="h5" align="left">
            Library
          </Typography>
        </Grid>
        {isModerator && (
          <Grid item xs={6} sm={4} md={3}>
            <common.MuiButton
              variant="contained"
              size="large"
              label="Add Content"
              className={classes.addContentButton}
              startIcon={<AddIcon />}
              onClick={openContentModal}
            />
          </Grid>
        )}
      </Grid>

      <Card className={classes.card}>
        <Grid container spacing={3} padding={'20px'}>
          <Grid item xs={12} sm={4.5} md={6} lg={6}>
            <common.Input
              name="content"
              placeholder="Search libraries"
              value={libraryContent.content}
              listUpdater={setLibraryContent}
              startIcon={true}
            />
          </Grid>

          <Grid item xs={5} sm={3.5} md={3} lg={3.5}>
            <common.Select
              name="sortBy"
              value={libraryContent.sortBy}
              defaultValue="Sort By"
              listUpdater={setLibraryContent}
              options={sortByData}
            />
          </Grid>
          <Grid item xs={4.5} sm={2.5} md={2} lg={1.5}>
            <ToggleButtons setView={setView} view={view} />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <common.MuiButton startCustomIcon={filter} onClick={openFilterModal} />
            {(selectedTags?.length !== 0 || selectedTypes?.length !== 0) && (
              <common.BaseButton label={selectedTags?.length + selectedTypes?.length} />
            )}
          </Grid>
        </Grid>
        <common.InfiniteQueryWrapper
          status={status}
          data={data}
          error={error}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isFetching={isFetching}
        >
          {(libraries) =>
            view === 'list' ? (
              <LibraryContent
                libraryData={libraries}
                typeIcons={typeIcons}
                moreOptions={filteredMoreOptions}
                handleMoreClick={handleMoreClick}
              />
            ) : (
              <ModuleView
                libraryData={libraries}
                typeIcons={typeIcons}
                moreOptions={filteredMoreOptions}
                handleMoreClick={handleMoreClick}
              />
            )
          }
        </common.InfiniteQueryWrapper>
      </Card>
      <CreateContent
        isOpen={isContentDialogOpen}
        onClose={closeContentModal}
        contentTypes={contentTypes}
        setLibraryContent={setLibraryContent}
      />
      <FilterLibrary
        isOpen={isFilterDialogOpen}
        onClose={closeFilterModal}
        contentTypes={contentTypes}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        setApplyFilters={setApplyFilters}
      />
    </>
  )
}

export { Library }
