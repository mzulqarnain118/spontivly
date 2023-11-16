import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
export default function MuiButton(
  {
    className,
    label,
    endIcon,
    button,
    startIcon,
    disabled,
    children,
    variant,
    size,
    bgcolor,
    color,
    onClick,
    handleUploadPhoto,
    ...other
  },
  props
) {
  return (
    <Button
      variant={variant ?? "outlined"}
      label={label}
      size={size ?? "small"}
      disabled={disabled}
      className={className}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        backgroundColor: bgcolor && `${bgcolor} !important`,
        textTransform: "none",
        color:color
      }}
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
