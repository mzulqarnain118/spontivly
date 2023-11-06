import React from 'react'
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import commonStyles from "../../styles/commonStyles";
export default function Input({ name, className, label, value, defaultValue, error = null, onChange, ...other }, props) {
      const theme = useTheme();
    const classes = commonStyles();
    
    return (
      <TextField
        fullWidth
        variant="outlined"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        onWheel={(e) => {
          if (props?.inputProps?.type === "number") e.target.blur();
        }}
        defaultValue={defaultValue}
        className={className ?? classes.searchInput}
        sx={{
          [theme.breakpoints.up("md")]: {
            width: "30vw", // Adjust width for screens wider than 'md' breakpoint
          },
        }}
        {...other}
        {...(error && { error: true, helperText: error })}
      />
    );
}