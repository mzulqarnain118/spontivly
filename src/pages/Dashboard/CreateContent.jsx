import { Box, Card, Divider, Grid, Typography } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useCustomForm } from 'components/common/Form'
import { Toast } from 'components/common/Toast/Toast'
import qs from 'qs'
import { useState, useEffect } from 'react'
import { Controls as common } from '../../components/common'
import { dashboardStyles } from '../../styles/components/dashboardStyles'
import { ApiCall, reduceArrayByKeys } from '../../utils'

const CreateContent = ({
  isOpen,
  onClose,
  setLibraryContent,
  contentTypes,
  setEditContent,
  isEditing = false,
  editContentData = null,
  refetchLibraries
}) => {
  const classes = dashboardStyles()
  const { reset } = useCustomForm()
  const [type, setType] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [pdfFile, setPdfFile] = useState(null)
  const [searchTagText, setSearchTagText] = useState('')

  useEffect(() => {
    if (isEditing) {
      setType(editContentData?.type ?? '')
      setSelectedTags(editContentData?.tags ?? [])
    }
  }, [])

  async function fetchTags({ pageParam = 1 }, name) {
    const queryParams = {
      page: pageParam,
      name
    }
    const encodedParams = qs.stringify(queryParams, { arrayFormat: 'comma' })
    const apiUrl = `tags?${encodedParams}`

    return ApiCall(apiUrl)
  }

  const { data: tags } = useInfiniteQuery({
    queryKey: ['libraryTags', searchTagText], // Dynamic query key
    queryFn: ({ pageParam = 1 }) => fetchTags({ pageParam }, searchTagText),
    getNextPageParam: (lastPage) => lastPage?.next
  })

  const handleContentSubmit = async (formData) => {
    const tags = reduceArrayByKeys(selectedTags, ['id'])
    let payload = { ...formData, type, tags }

    const combinedFormData = new FormData()

    if (pdfFile) {
      combinedFormData.append('file', pdfFile)
      combinedFormData.append('data', JSON.stringify(payload))
    }

    console.log(payload)
    const addedContent = await ApiCall(
      isEditing ? `libraries/${editContentData?.id}/` : 'libraries/',
      null,
      isEditing ? 'PATCH' : 'POST',
      pdfFile
        ? combinedFormData
        : {
            data: JSON.stringify(payload)
          }
    )

    if (addedContent) {
      setEditContent && setEditContent((old) => !old)
      Toast(`Library Content ${isEditing ? 'Updated' : 'Added'} Successfully`)
    }

    setLibraryContent((prevState) => ({
      ...prevState,
      newLibraryAdded: true
    }))
    setType('')
    setSelectedTags([])
    refetchLibraries()
    onClose()
  }

  const handleTagChange = async (selectedValues) => {
    const updatedTags = await Promise.all(
      selectedValues.map(async (value) => {
        if (typeof value === 'string') {
          const addedTag = await ApiCall('tags/', null, 'POST', {
            name: value,
            title: value
          }) // Handle adding new tags

          return addedTag
        } else {
          return value
        }
      })
    )

    setSelectedTags(updatedTags)
  }

  return (
    <common.Popup
      openPopup={isOpen}
      setPopup={onClose}
      onClose={() => {
        reset()
        setType('')
        setSelectedTags([])
      }}
      width={'lg'}
      title={`${isEditing ? 'Update' : 'Create'} Content`}
      subTitle="Fill out a few details to get started!"
    >
      <common.Form
        submitLabel={`${isEditing ? 'Update' : 'Add'}`}
        onSubmit={handleContentSubmit}
        defaultValues={
          isEditing && {
            author: editContentData?.author,
            title: editContentData?.title,
            url: editContentData?.url,
            summary: editContentData?.summary,
            description: editContentData?.description
          }
        }
      >
        {({ errors, control }) => (
          <Card className={classes.contentCard}>
            <Grid container spacing={8}>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" align="left">
                  Heading
                </Typography>
                <Typography variant="h6" align="left" sx={{ color: 'customColors.subtitle1' }}>
                  What's your post all about?
                </Typography>
              </Grid>
              <Grid item xs={12} md={8} className={classes.createContentItem}>
                <common.ControlledInput name="title" control={control} errors={errors} placeholder="Title" />
                <Box className="row-between gap-1">
                  <common.ControlledInput name="author" control={control} errors={errors} placeholder="Author" />
                  <common.Select
                    defaultValue="Select content type"
                    options={contentTypes}
                    valueUpdater={setType}
                    value={type}
                    required
                    disabled={isEditing}
                  />
                </Box>
                <common.Autocomplete
                  placeholder="Tags"
                  variant="outlined"
                  value={selectedTags}
                  onChange={handleTagChange}
                  options={tags?.pages?.flatMap((page) => page?.results) ?? []}
                  inputValue={searchTagText}
                  setInputValue={setSearchTagText}
                  required
                />
              </Grid>
            </Grid>
            <Divider className={classes.createContentDivider} />
            <Grid container spacing={8}>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" align="left">
                  Content
                </Typography>
                <Typography variant="h6" align="left" sx={{ color: 'customColors.subtitle1' }}>
                  Provide some more details about your post
                </Typography>
              </Grid>
              <Grid item xs={12} md={8} className={classes.createContentItem}>
                {type != 'pdf' && (
                  <common.ControlledInput
                    name="url"
                    control={control}
                    errors={errors}
                    placeholder="Content URL"
                    disabled={type === 'pdf'}
                  />
                )}
                <common.ControlledInput
                  name="description"
                  control={control}
                  errors={errors}
                  component={<common.RichText placeholder="Description" />}
                />
                <common.ControlledInput name="summary" control={control} errors={errors} placeholder="Summary" />
                {type == 'pdf' && <common.DragDropFile onChange={setPdfFile} type="files" required={type === 'pdf'} />}
              </Grid>
            </Grid>
          </Card>
        )}
      </common.Form>
    </common.Popup>
  )
}

export { CreateContent }
