import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { ChangeEvent } from 'react'
import { Controls as common } from '../../components/common'

interface FileUploadButtonProps {
  handleUploadPhoto?: (event: ChangeEvent<HTMLInputElement>) => void
  onClick?: (event: ChangeEvent<HTMLInputElement>) => void
  label: string
  size?: 'small' | 'medium' | 'large'
  startIcon?: React.ReactNode
  startCustomIcon?: React.ReactNode
  endCustomIcon?: React.ReactNode
  bgcolor?: string
  accept?: string
  endIcon?: React.ReactNode
  variant?:string
}

const VisuallyHiddenInput = styled('input')`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  handleUploadPhoto, startCustomIcon, onClick,
  endCustomIcon, accept, variant, bgcolor, endIcon,
  label, size, startIcon, ...other }) => {

  return (
    <Button
      variant={variant}
      size={size ?? 'small'}
      onClick={onClick}
      startIcon={startCustomIcon ? <common.Img src={startCustomIcon} /> : startIcon}
      endIcon={endCustomIcon ? <common.Img src={endCustomIcon} /> : endIcon}
      sx={{
        backgroundColor: bgcolor && `${bgcolor}`,
        textTransform: 'none'
      }}
      {...other}
    >
      {label}
      {!onClick && <VisuallyHiddenInput id="fileInput" type={"file"} onChange={handleUploadPhoto} accept={accept ?? "image/*"} />}
    </Button>
  )
}

export { FileUploadButton }
