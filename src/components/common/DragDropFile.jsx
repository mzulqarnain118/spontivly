import React from 'react'
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "GIF"];
const DragDropFile = (onChange) => {
    const handleChange = (file) => {
        onChange(file);
      };

    return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} /> 
    )
}

export default DragDropFile
