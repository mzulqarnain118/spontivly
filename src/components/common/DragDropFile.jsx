import React from "react";
import { FileUploader } from "react-drag-drop-files";
const imageTypes = ["JPG", "PNG", "GIF"];
const fileTypes = ["PDF"];
const DragDropFile = ({onChange, type}) => {
  const handleChange = (file) => {
    onChange(file);
  };
  return (
    <FileUploader
      handleChange={handleChange}
      name="file"
      types={type == "pdf" ? fileTypes : imageTypes}
    />
  );
};

export default DragDropFile;
