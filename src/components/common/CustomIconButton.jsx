import React from "react";
import { Button} from "@mui/joy";
import commonStyles from "../../styles/commonStyles";
import { styled } from "@mui/joy";
import Img from './Img'
const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;

  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
export default function CustomIconButton(
  {
    className,
    label,
    CustomIcon,
    children,
    onClick,
    handleUploadPhoto,
    ...other
  },
  props
) {
  const classes = commonStyles();

  return (
    <Button
      variant="outlined"
      color="neutral"
      tabIndex={-1}
      component="label"
      label={label}
      className={className ?? classes.button}
      onClick={onClick}
      startDecorator={<Img src={CustomIcon}/>}
      {...other}
    >
      {handleUploadPhoto && (
        <VisuallyHiddenInput
          type="file"
          onChange={handleUploadPhoto}
          accept="image/*"
        />
      )}
      {label}
      {children}
    </Button>
  );
}
