import { Card, CardContent } from '@mui/material'
import React, { useState } from 'react'
import uploadImgIcon from '../../assets/icons/fi_image.svg'
import pollIcon from '../../assets/icons/u_chart-growth-alt.svg'
import fileIcon from '../../assets/icons/u_paperclip.svg'
import { Controls as common } from '../../components/common'
import { channelStyles } from './channelStyles'
import { ApiCall, readFile } from 'utils'
import { Toast } from 'components/common/Toast/Toast'


interface UploadFile {
  file?: string
  filePayload?: any
}

const CreatePostCard = () => {
  const classes = channelStyles()
  const [selectedButton, setSelectedButton] = useState(null)
  const [uploadFile, setUploadFile] = useState<UploadFile>({})

  const buttons = [
    { label: 'Upload Image', icon: uploadImgIcon, slug: 'upload-image' },
    { label: 'Upload File', icon: fileIcon, slug: 'upload-file' },
    { label: 'Poll', icon: pollIcon, slug: 'poll' }
  ]

  const handleClick = (slug, event) => {
    setSelectedButton(slug)
    if (slug === "poll") {
      console.log("slog")
    }
    else {
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
      combinedFormData.append('file', uploadFile.filePayload)
      combinedFormData.append('data', JSON.stringify(values))
      const createdChannel = await ApiCall('posts/', null, 'POST', combinedFormData)
      if (createdChannel) {
        Toast('Channel Created Successfully')
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <Card className={classes.container}>
      <CardContent>
        <common.Form onSubmit={createPostSubmit} submitLabel="Create Post">
          {({ register }) => (
            <>
              <common.Input register={register("title", { required: true })} placeholder="Title" />
              <common.Input register={register("description")} placeholder="Write here..." multiline />
              {/* File Preview Section */}
              {uploadFile?.file && (
                <common.ChipContainer chips={[{ file: selectedButton === "upload-image" ? uploadFile?.file : fileIcon }]} onDelete={() => setUploadFile({})}/>
              )}
              <div className="row-center">
                {buttons.map(({ label, icon, slug }) => (
                  <common.FileUploadButton
                    key={slug}
                    variant="plain"
                    size="large"
                    label={label}
                    accept={slug === "upload-file" ? "application/*" : "image/*"}
                    bgcolor={selectedButton === slug ? '#E9EDF0' : ''}
                    startCustomIcon={icon}
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
