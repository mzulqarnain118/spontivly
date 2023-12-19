// DragDropFile.tsx
import React from 'react'
import { FileUploader } from 'react-drag-drop-files'
import dashboardStyles from 'styles/components/dashboardStyles'
import '../../styles/components/dragAndDropFileStyles.css'

const fileTypes = {
  images: ['JPG', 'PNG', 'GIF'],
  files: ['PDF']
}

type FileType = keyof typeof fileTypes

interface DragDropFileProps {
  onChange: (file: File) => void
  type: FileType
  border?: string
  iconColor?: string
}

const DragDropFile: React.FC<DragDropFileProps> = ({ onChange, type, border, iconColor, ...others }) => {
  const handleChange = (file: File) => {
    onChange(file)
  }
  const classes = dashboardStyles()

  return <FileUploader handleChange={handleChange} name="file" types={fileTypes[type]} {...others} />
}

export default DragDropFile
