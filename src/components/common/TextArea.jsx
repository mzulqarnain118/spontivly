import React from "react";
import Textarea from "@mui/joy/Textarea";
import commonStyles from "../../styles/commonStyles";
import { useTheme } from "@mui/material/styles";

export default function MuiTextarea(
  {
    value,
    placeholder,
    className,
    defaultValue,
    minRows,
    maxRows,
    label,
    onChange,
    name,
    required,
    ...others
  },
  props
) {
  const theme = useTheme();
  const classes = commonStyles();
  return (
    <Textarea
      placeholder={placeholder}
      defaultValue={defaultValue}
      minRows={minRows}
      maxRows={maxRows}
      value={value}
      onChange={onChange}
      fullWidth
      required={required || false}
      name={name}
      className={className ?? classes.textArea}
      sx={{
        [theme.breakpoints.up("md")]: {
          width: "34.1875rem",
          height: "11.34rem", // Adjust width for screens wider than 'md' breakpoint
        }, // Initially use full width
      }}
      {...others}
    />
  );
}
