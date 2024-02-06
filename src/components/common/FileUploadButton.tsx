import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { ChangeEvent } from 'react'
import { Controls as common } from '../../components/common'
import { Toast } from './Toast/Toast'

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
  variant?: string
  type?: string
  className?: string
  width?: string
  disabled?: boolean
}

const VisuallyHiddenInput = styled('input')`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  handleUploadPhoto,
  startCustomIcon,
  onClick,
  endCustomIcon,
  accept,
  variant,
  bgcolor,
  endIcon,
  label,
  size,
  className,
  width,
  type,
  startIcon,
  ...other
}) => {
  const handleClick = type === 'button' ? handleUploadPhoto : onClick
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    if (file) {
      const maxSize = getMaxSize(accept)

      if (file.size > maxSize) {
        Toast(`File size exceeds the maximum allowed size. Maximum allowed size is ${maxSize / 1024 / 1024}MB.`, 'error')

        return
      }
    }

    handleUploadPhoto?.(event)
  }

  const getMaxSize = (fileType?: string) => {
    switch (fileType) {
      case 'image/*':
        return 5 * 1024 * 1024 // 5MB for images
      case 'application/pdf':
        return 20 * 1024 * 1024 // 20MB for PDFs
      case 'video/*':
        return 20 * 1024 * 1024 // 20MB for videos
      default:
        return 20 * 1024 * 1024 // 20MB for other file types
    }
  }

  return (
    <Button
      variant={variant}
      className={className}
      size={size ?? 'small'}
      onClick={handleClick}
      startIcon={startCustomIcon ? <common.Img src={startCustomIcon} /> : startIcon}
      endIcon={endCustomIcon ? <common.Img src={endCustomIcon} /> : endIcon}
      sx={{
        backgroundColor: bgcolor && `${bgcolor}`,
        textTransform: 'none',
        width: width
      }}
      {...other}
    >
      {label}
      {!onClick && <VisuallyHiddenInput id="fileInput" type={type ?? 'file'} onChange={handleFileChange} accept={accept} />}
    </Button>
  )
}

export { FileUploadButton }
