// DragDropFile.tsx
import React from 'react'
import { FileUploader } from 'react-drag-drop-files'
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

const DragDropFile: React.FC<DragDropFileProps> = ({ onChange, type, ...others }) => {
  const handleChange = (file: File) => {
    onChange(file)
  }

  return <FileUploader handleChange={handleChange} name="file" types={fileTypes[type]} {...others} />
}

export { DragDropFile }
