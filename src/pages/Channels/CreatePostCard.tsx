import { Card, CardContent, Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import uploadImgIcon from '../../assets/icons/fi_image.svg'
import pollIcon from '../../assets/icons/u_chart-growth-alt.svg'
import fileIcon from '../../assets/icons/u_paperclip.svg'
import { Controls as common } from '../../components/common'
import { Toast } from '../../components/common/Toast/Toast'
import { ApiCall, isImageFile, readFile } from '../../utils'
import { channelStyles } from './channelStyles'

interface UploadFile {
  file?: string
  filePayload?: any
}

type CreatePostCardProps = {
  refetch: any
  setEditPost?: any
  isEditing?: boolean
  postDataToEdit?: any
}

const CreatePostCard: React.FC<CreatePostCardProps> = ({ refetch, setEditPost, isEditing = false, postDataToEdit }) => {
  const { channelId } = useParams()
  const classes = channelStyles()
  const [selectedButton, setSelectedButton] = useState<string>('')
  const [uploadFile, setUploadFile] = useState<UploadFile>({})
  const [pollOptions, setPollOptions] = useState<string[]>([])

  useEffect(() => {
    if (isEditing) {
      if (postDataToEdit?.attachment) {
        if (isImageFile(postDataToEdit?.attachment)) {
          setSelectedButton('upload-image')
        } else {
          setSelectedButton('upload-file')
        }

        setUploadFile({ file: postDataToEdit?.attachment })
      } else if (postDataToEdit?.choices?.length !== 0) {
        setSelectedButton('poll')
        const existingPollOptions = postDataToEdit?.choices?.map((item) => ({ id: item?.id, name: item?.name }))

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
        ...(selectedButton === 'poll' && { pollOptions }),
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
        setSelectedButton('')
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

  const handleAddOption = () => {
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
                    isEditing={isEditing}
                  />
                </div>
              )}
              <Box className="row-center" sx={{ flexDirection: { xss: 'column', xs: 'column', sm: 'row' } }}>
                {buttons.map(({ label, icon, slug }) => (
                  <common.FileUploadButton
                    key={slug}
                    width="100%"
                    variant="plain"
                    size="large"
                    label={label}
                    accept={slug === 'upload-image' ? 'image/*' : ''}
                    bgcolor={selectedButton === slug ? '#E9EDF0' : ''}
                    startCustomIcon={icon}
                    type={slug === 'poll' ? 'button' : 'file'}
                    handleUploadPhoto={(event) => handleClick(slug, event)}
                    disabled={isEditing && slug !== selectedButton}
                  />
                ))}
              </Box>
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
  handleDeleteOption,
  isEditing
}: {
  pollOptions: string[]
  setPollOptions: React.Dispatch<React.SetStateAction<string[]>>
  handleAddOption: () => void
  handleDeleteOption: (index: number) => void
  isEditing?: boolean
}) {
  return (
    <div className="col-start gap-1">
      <Typography variant="h6">Poll Options:</Typography>
      {pollOptions.map((option, index) => (
        <div key={index} className="row-evenly">
          <common.Input
            placeholder={`Option ${index + 1}`}
            value={option?.name ?? option}
            customHandleChange={(e) => {
              const updatedOptions = [...pollOptions]

              if (updatedOptions[index]?.name) {
                updatedOptions[index].name = e.target.value
              } else updatedOptions[index] = isEditing ? { id: null, name: e.target.value } : e.target.value

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
