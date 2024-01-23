import { Card, CardContent, Typography } from '@mui/material'
import { Toast } from 'components/common/Toast/Toast'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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

const CreatePostCard = ({
  refetch,
  setEditPost,
  isEditing = false, // new prop to indicate whether it's for editing or adding
  postDataToEdit // new prop to provide data for editing
}) => {
  const { channelId } = useParams()
  const isFile = ['mp4', 'mov', 'avi', 'pdf'].some((ext) => postDataToEdit?.attachment?.toLowerCase().endsWith(`.${ext}`))
  const classes = channelStyles()
  const [selectedButton, setSelectedButton] = useState<string>('')
  const [uploadFile, setUploadFile] = useState<UploadFile>({})
  const [pollOptions, setPollOptions] = useState<string[]>([])

  useEffect(() => {
    if (isEditing) {
      if (postDataToEdit?.attachment) {
        if (isFile) {
          setSelectedButton('upload-file')
        } else {
          setSelectedButton('upload-image')
        }

        setUploadFile({ file: postDataToEdit?.attachment })
      } else if (postDataToEdit?.choices?.length !== 0) {
        setSelectedButton('poll')
        const existingPollOptions = postDataToEdit?.choices?.map((item) => item?.name)

        setPollOptions(existingPollOptions)
      }
    }
  }, [])

  const buttons = [
    { label: 'Upload Image', icon: uploadImgIcon, slug: 'upload-image' },
    { label: 'Upload File', icon: fileIcon, slug: 'upload-file' },
    { label: 'Poll', icon: pollIcon, slug: 'poll' }
  ]

  const handleClick = (slug, event) => {
    setSelectedButton(slug)

    if (slug === 'poll') {
      setUploadFile({})
      setPollOptions(() => ['', ''])
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
      const payload = {
        ...values,
        pollOptions,
        channel: channelId
      }

      if (uploadFile?.filePayload) {
        combinedFormData.append('file', uploadFile.filePayload)
        combinedFormData.append('data', JSON.stringify(payload))
      }

      const post = await ApiCall(
        isEditing ? `posts/${postDataToEdit.id}/` : 'posts/',
        null,
        isEditing ? 'PATCH' : 'POST',
        uploadFile?.filePayload
          ? combinedFormData
          : {
              data: JSON.stringify(payload)
            }
      )

      if (post) {
        setSelectedButton(null)
        setEditPost && setEditPost((old) => !old)
        setUploadFile({})
        setPollOptions(() => [''])
        Toast(`Post ${isEditing ? 'Updated' : 'Added'} Successfully`)
        refetch()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleAddOption = (index) => {
    setPollOptions((old) => [...old, ''])
  }

  const handleDeleteOption = (index) => {
    const updatedOptions = [...pollOptions]

    updatedOptions.splice(index, 1)
    setPollOptions(updatedOptions)
  }

  return (
    <Card className={classes.container}>
      <CardContent>
        <common.Form
          onSubmit={createPostSubmit}
          submitLabel={`${isEditing ? 'Edit' : 'Create'} ${selectedButton === 'poll' ? 'Poll' : 'Post'}`}
          defaultValues={
            isEditing && {
              title: postDataToEdit?.title,
              description: postDataToEdit?.description
            }
          }
        >
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
                <div className={isEditing && postDataToEdit?.is_closed && 'disabled'}>
                  <CreatePoll
                    pollOptions={pollOptions}
                    setPollOptions={setPollOptions}
                    handleAddOption={handleAddOption}
                    handleDeleteOption={handleDeleteOption}
                  />
                </div>
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
            customHandleChange={(e) => {
              const updatedOptions = [...pollOptions]

              updatedOptions[index] = e.target.value
              setPollOptions(updatedOptions)
            }}
            required
          />
          <common.MuiIcon name="Add" color="primary" onClick={handleAddOption} />
          {index > 1 && <common.MuiIcon name="Delete" color="secondary" onClick={() => handleDeleteOption(index)} />}
        </div>
      ))}
    </div>
  )
}
