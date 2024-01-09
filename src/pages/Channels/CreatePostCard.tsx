import { Card, CardContent, Typography } from '@mui/material'
import { Toast } from 'components/common/Toast/Toast'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ApiCall, readFile } from 'utils'
import uploadImgIcon from '../../assets/icons/fi_image.svg'
import pollIcon from '../../assets/icons/u_chart-growth-alt.svg'
import fileIcon from '../../assets/icons/u_paperclip.svg'
import { Controls as common } from '../../components/common'
import { channelStyles } from './channelStyles'

interface UploadFile {
  file?: string
  filePayload?: any
}

const CreatePostCard = ({ refetch, channelId }) => {
  const classes = channelStyles()
  const [selectedButton, setSelectedButton] = useState(null)
  const [uploadFile, setUploadFile] = useState<UploadFile>({})
  const [pollOptions, setPollOptions] = useState<string[]>([])

  const buttons = [
    { label: 'Upload Image', icon: uploadImgIcon, slug: 'upload-image' },
    { label: 'Upload File', icon: fileIcon, slug: 'upload-file' },
    { label: 'Poll', icon: pollIcon, slug: 'poll' }
  ]

  const handleClick = (slug, event) => {
    setSelectedButton(slug)

    if (slug === 'poll') {
      setUploadFile({})
      setPollOptions(() => [''])

    } else {
      setPollOptions(() => [])
      const file = event.target.files?.[0]

      if (!file) return
      readFile(file, (uploadedImage) => {
        setUploadFile({ file: uploadedImage, filePayload: file })
      })
    }
  }

  const createPostSubmit = async (values) => {
    try {
      const combinedFormData = new FormData()

      if (uploadFile?.filePayload) {
        combinedFormData.append('file', uploadFile.filePayload)
      }

      combinedFormData.append('data', JSON.stringify({ ...values, pollOptions, channel: channelId }))
      const createdPost = await ApiCall('posts/', null, 'POST', combinedFormData)

      if (createdPost) {
        setSelectedButton(null)
        setUploadFile({})
        setPollOptions(() => [''])
        Toast('Post Created Successfully')
        refetch()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleAddOption = () => {
    setPollOptions([...pollOptions, ''])
  }

  const handleDeleteOption = (index) => {
    const updatedOptions = [...pollOptions]

    updatedOptions.splice(index, 1)
    setPollOptions(updatedOptions)
  }

  return (
    <Card className={classes.container}>
      <CardContent>
        <common.Form onSubmit={createPostSubmit} submitLabel={`Create ${selectedButton === 'poll' ? 'Poll' : 'Post'}`}>
          {({ register, errors, control }) => (
            <>
              <common.ControlledInput name="title" control={control} errors={errors} placeholder="Title" />
              <common.Input
                register={register('description')}
                placeholder={selectedButton === 'poll' ? 'Question' : 'Description'}
                multiline
              />
              {/* File Preview Section */}
              {uploadFile?.file && (
                <common.ChipContainer
                  chips={[{ file: selectedButton === 'upload-image' ? uploadFile?.file : fileIcon }]}
                  onDelete={() => setUploadFile({})}
                />
              )}

              {selectedButton === 'poll' && (
                <CreatePoll
                  pollOptions={pollOptions}
                  setPollOptions={setPollOptions}
                  handleAddOption={handleAddOption}
                  handleDeleteOption={handleDeleteOption}
                />
              )}
              <div className="row-center">
                {buttons.map(({ label, icon, slug }) => (
                  <common.FileUploadButton
                    key={slug}
                    variant="plain"
                    size="large"
                    label={label}
                    accept={slug === 'upload-file' ? 'application/pdf,video/*' : 'image/*'}
                    bgcolor={selectedButton === slug ? '#E9EDF0' : ''}
                    startCustomIcon={icon}
                    type={slug === 'poll' ? 'button' : 'file'}
                    handleUploadPhoto={(event) => handleClick(slug, event)}
                  />
                ))}
              </div>
            </>
          )}
        </common.Form>
      </CardContent>
    </Card>
  )
}

export { CreatePostCard }

function CreatePoll({
  pollOptions,
  setPollOptions,
  handleAddOption,
  handleDeleteOption
}: {
  pollOptions: string[]
  setPollOptions: React.Dispatch<React.SetStateAction<string[]>>
  handleAddOption: () => void
  handleDeleteOption: (index: number) => void
}) {
  return (
    <div className="col-start gap-1">
      <Typography variant="h6">Poll Options:</Typography>
      {pollOptions.map((option, index) => (
        <div key={index} className="row-evenly">
          <common.Input
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => {
              const updatedOptions = [...pollOptions]

              updatedOptions[index] = e.target.value
              setPollOptions(updatedOptions)
            }}
          />
          <common.MuiIcon name="Add" color="primary" onClick={handleAddOption} />
          {index > 1 && <common.MuiIcon name="Delete" color="secondary" onClick={() => handleDeleteOption(index)} />}
        </div>
      ))}
    </div>
  )
}
