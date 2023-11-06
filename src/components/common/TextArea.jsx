import React from 'react';
import { TextField } from "@mui/material";
import commonStyles from "../../styles/commonStyles";
import { useTheme } from "@mui/material/styles";

export default function MaxHeightTextarea({ className, label, rows, setValue, onChange, name, required, others }, props) {
      const theme = useTheme();
      const classes = commonStyles();
  return (
    <div className="row pl-4 pr-4 pt-1 pb-2">
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        multiline={true}
        rows={rows ?? 5}
        fullWidth
        required={required || false}
        name={name}
        value={setValue} //state
        onChange={onChange}
        className={className ?? classes.textArea}
        sx={{
          [theme.breakpoints.up("md")]: {
            width: "34.1875rem",
            height: "11.34rem", // Adjust width for screens wider than 'md' breakpoint
          }, // Initially use full width
        }}
        {...others}
      />
    </div>
  );
}
