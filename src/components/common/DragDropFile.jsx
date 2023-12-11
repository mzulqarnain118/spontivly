import { FileUploader } from "react-drag-drop-files";
import dashboardStyles from "styles/components/dashboardStyles";
import "../../styles/components/dragAndDropFileStyles.css";

const imageTypes = ["JPG", "PNG", "GIF"];
const fileTypes = ["PDF"];
const DragDropFile = ({ onChange, type, border, iconColor, ...others }) => {
  const handleChange = (file) => {
    onChange(file);
  };
  const classes = dashboardStyles();

  return (
    <FileUploader
      handleChange={handleChange}
      name="file"
      types={type == "pdf" ? fileTypes : imageTypes}
      {...others}
    />
  );
};

export default DragDropFile;
