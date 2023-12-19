import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { ChangeEvent } from 'react'

interface FileUploadButtonProps {
  handleUploadPhoto: (event: ChangeEvent<HTMLInputElement>) => void
  label: string
  size?: 'small' | 'medium' | 'large'
  startIcon?: React.ReactNode
}

const VisuallyHiddenInput = styled('input')`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ handleUploadPhoto, label, size, startIcon, ...other }) => {
  return (
    <Button
      size={size ?? 'small'}
      startIcon={startIcon}
      sx={{
        textTransform: 'none'
      }}
      {...other}
    >
      {label}
      <VisuallyHiddenInput id="fileInput" type="file" onChange={handleUploadPhoto} accept="image/*" />
    </Button>
  )
}

export default FileUploadButton
