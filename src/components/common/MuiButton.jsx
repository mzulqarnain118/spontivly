import React from "react";
import { Button  } from "@mui/material";
import commonStyles from "../../styles/commonStyles";

export default function MuiButton(
  { className, label, endIcon,startIcon,disabled, children, onClick, ...other },
  props
) {
  const classes = commonStyles();

  return (
    <Button
      variant="outlined"
      label={label}
      disabled={disabled}
      className={className ?? classes.button}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      {...other}
    >
      {label}
      {children}
    </Button>
  );
}
