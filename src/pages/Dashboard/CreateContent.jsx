import { Box, Card, Divider, Grid, Typography } from '@mui/material'
import qs from 'qs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useInfiniteQuery } from 'react-query'
import { Controls as common } from '../../components/common'
import { dashboardStyles } from '../../styles/components/dashboardStyles'
import { ApiCall, reduceArrayByKeys } from '../../utils'

const CreateContent = ({ isOpen, onClose, setLibraryContent, contentTypes }) => {
  const classes = dashboardStyles()
  const { register, handleSubmit } = useForm()
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [pdfFile, setPdfFile] = useState(null)
  const [searchTagText, setSearchTagText] = useState('')

  async function fetchTags({ pageParam = 1 }, name) {
    const queryParams = {
      page: pageParam,
      name
    }
    const encodedParams = qs.stringify(queryParams, { arrayFormat: 'comma' })
    const apiUrl = `tags?${encodedParams}`

    return ApiCall(apiUrl)
  }

  const { data: tags } = useInfiniteQuery(
    ['libraryTags', searchTagText], // Dynamic query key
    ({ pageParam = 1 }) => fetchTags({ pageParam }, searchTagText),
    {
      getNextPageParam: (lastPage) => lastPage?.next
    }
  )

  const onSubmit = async (formData) => {
    const tags = reduceArrayByKeys(selectedTags, ['id'])
    let payload = { ...formData, type, description, tags }

    if (pdfFile) {
      const combinedFormData = new FormData()

      combinedFormData.append('file', pdfFile)
      combinedFormData.append('data', JSON.stringify(payload))
      await ApiCall('libraries/', null, 'POST', combinedFormData)
    } else {
      await ApiCall('libraries/', null, 'POST', {
        data: JSON.stringify(payload)
      })
    }

    setLibraryContent((prevState) => ({
      ...prevState,
      newLibraryAdded: true
    }))
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
      width={'lg'}
      title="Create Content"
      subTitle="Fill out a few details to get started!"
      submitBtnLabel="Save"
      submitHandler={handleSubmit(onSubmit)}
    >
      <form key="2000" onSubmit={handleSubmit(onSubmit)}>
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
              <common.Input register={register('title', { required: true })} placeholder="Title" />
              <Box className="row-between gap-1">
                <common.Input register={register('author', { required: true })} placeholder="Author" />
                <common.Select defaultValue="Select content type" options={contentTypes} valueUpdater={setType} value={type} required />
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
                <common.Input
                  register={register('url', { required: type !== 'pdf' })}
                  placeholder="Content URL"
                  disabled={type === 'pdf'}
                />
              )}
              <common.Input register={register('summary', { required: true })} placeholder="Summary" />
              <common.RichText value={description} onBlur={setDescription} cssClass={classes.editor} required />
              {type == 'pdf' && <common.DragDropFile onChange={setPdfFile} type="files" required={type === 'pdf'} />}
            </Grid>
          </Grid>
        </Card>
      </form>
    </common.Popup>
  )
}

export { CreateContent }
