import AddIcon from '@mui/icons-material/Add'
import { Card, Grid, Typography, Badge, Box } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Toast } from 'components/common/Toast/Toast'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import doc from '../../assets/icons/doc.png'
import filter from '../../assets/icons/filter.svg'
import link from '../../assets/icons/link.png'
import pdf from '../../assets/icons/pdf.png'
import youtube from '../../assets/icons/youtube.png'
import youtubeText from '../../assets/icons/youtubeText.png'
import { Controls as common } from '../../components/common'
import { ToggleButtons } from '../../components/common/ToggleButtons'
import { dashboardStyles } from '../../styles/components/dashboardStyles'
import { ApiCall, capitalizeFirstLetter, encodeParams, getLocal, setLocal } from '../../utils'
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

const sortByData = [
  { id: 'Most Recent', title: 'Most Recent' },
  { id: 'Save For Later', title: 'Saved For Later' }
]

export const typeIcons = { youtube: youtubeText, doc: doc, link: link, pdf: pdf }
const moreOptions = ['Edit Content', 'Delete Content', 'Publish Content', 'UnPublish Content']
const updateLibraryContent = {
  'Publish Content': 'published',
  'UnPublish Content': 'un-published',
  'Delete Content': 'archived'
}

function Library() {
  const navigate = useNavigate()
  const { isModerator, userId } = useSelector((state) => state?.dashboard)
  const filterMoreOptions = (createdUserId, i_saved) => {
    const filteredMoreOptions = [...moreOptions, i_saved ? 'Remove From Saved Later' : 'Saved For Later']

    return isModerator && createdUserId === userId ? filteredMoreOptions : filteredMoreOptions.slice(4)
  }
  const [view, setView] = useState(getLocal('libraryView') ?? 'list')
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
  const [editContent, setEditContent] = useState(false)
  const [editContentData, setEditContentData] = useState(null)

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

  const { data, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess, isError } = useInfiniteQuery({
    queryKey: ['libraries', libraryContent, applyFilters], // Dynamic query key
    queryFn: ({ pageParam = 1 }) =>
      fetchLibraries({ pageParam }, selectedTypes, selectedTags, libraryContent.content, libraryContent.sortBy),

    getNextPageParam: (lastPage) => lastPage?.next
  })

  const classes = dashboardStyles()
  const openContentModal = () => {
    setContentDialogOpen(true)

    if (editContent) {
      setEditContent(false)
      setEditContentData(null)
    }
  }
  const closeContentModal = () => {
    setContentDialogOpen(false)
  }
  const openFilterModal = () => {
    setFilterDialogOpen(true)
  }
  const closeFilterModal = () => {
    setFilterDialogOpen(false)
  }

  const contentSaveForLater = async (library_id) => {
    const contentSaved = await ApiCall(`libraries/save/`, null, 'POST', { library_id })

    if (contentSaved) {
      Toast(`Content Saved for Later Successfully`)
      refetch()
    }
  }
  const contentUnSaveForLater = async (library_id) => {
    const unSaveContent = await ApiCall(`libraries/save/${library_id}`, null, 'DELETE')

    if (unSaveContent) {
      Toast(`Content Removed from Saved Later List Successfully`)
      refetch()
    }
  }

  const patchLibraryContent = async (contentId, status) => {
    const editedContent = await ApiCall(`libraries/${contentId}/`, null, 'PATCH', { data: JSON.stringify({ status }) })

    if (editedContent) {
      Toast(`Content ${capitalizeFirstLetter(status)} Successfully`)
      refetch()
    }
  }

  const handleMoreClick = (item, content) => {
    if (updateLibraryContent.hasOwnProperty(item)) {
      patchLibraryContent(content?.id, updateLibraryContent[item])
    } else if (item === 'Saved For Later') {
      contentSaveForLater(content?.id)
    } else if (item === 'Remove From Saved Later') {
      contentUnSaveForLater(content?.id)
    } else if (item == 'Edit Content') {
      setEditContent(true)
      setEditContentData(content)
      setContentDialogOpen(true)
    }
  }

  function openLibraryInfo(library) {
    setLocal('libraryView', view)
    navigate(`/library/${library.id}`, { state: { library } })
  }

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={6} sm={8} md={9} lg={9}>
          <Typography align="left" variant="h5">
            Library
          </Typography>
        </Grid>
        {isModerator && (
          <Grid item xs={6} sm={4} md={3} lg={3}>
            <common.MuiButton
              variant="contained"
              label="Add Content"
              className={classes.addContentButton}
              startIcon={<AddIcon />}
              onClick={openContentModal}
              minWidth="90%"
            />
          </Grid>
        )}
      </Grid>

      <Card className={classes.card}>
        <Box sx={{ display: 'flex', gap: 3, p: 4, flexWrap: 'wrap' }}>
          <Box sx={{ flex: { md: 3, sm: 3 }, flexGrow: 1 }}>
            <common.Input
              name="content"
              placeholder="Search libraries"
              value={libraryContent.content}
              listUpdater={setLibraryContent}
              startIcon="Search"
            />
          </Box>
          <Box sx={{ flex: 1, flexGrow: 1 }}>
            <common.Select
              name="sortBy"
              value={libraryContent.sortBy}
              defaultValue="Sort By"
              listUpdater={setLibraryContent}
              options={sortByData}
            />
          </Box>

          <ToggleButtons setView={setView} view={view} />
          <Badge
            badgeContent={selectedTags?.length !== 0 || selectedTypes?.length !== 0 ? selectedTags?.length + selectedTypes?.length : 0}
            color="primary"
            sx={{ mr: 4 }}
          >
            <common.MuiButton startCustomIcon={filter} onClick={openFilterModal} />
          </Badge>
        </Box>
        <common.InfiniteQueryWrapper
          isSuccess={isSuccess}
          isError={isError}
          data={data}
          error={error}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {(libraries) =>
            view === 'list' ? (
              <LibraryContent
                libraryData={libraries}
                typeIcons={typeIcons}
                moreOptions={filterMoreOptions}
                handleMoreClick={handleMoreClick}
                openLibraryInfo={openLibraryInfo}
              />
            ) : (
              <ModuleView
                libraryData={libraries}
                typeIcons={typeIcons}
                moreOptions={filterMoreOptions}
                handleMoreClick={handleMoreClick}
                openLibraryInfo={openLibraryInfo}
              />
            )
          }
        </common.InfiniteQueryWrapper>
      </Card>
      {isContentDialogOpen && (
        <CreateContent
          isOpen={isContentDialogOpen}
          onClose={closeContentModal}
          contentTypes={contentTypes}
          setLibraryContent={setLibraryContent}
          isEditing={editContent}
          setEditContent={setEditContent}
          editContentData={editContentData}
          refetchLibraries={refetch}
        />
      )}
      {isFilterDialogOpen && (
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
      )}
    </>
  )
}

export { Library }
