import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText, TextField } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import commonStyles from "../../styles/commonStyles";
export default function Select(
  {
    name,
    className,
    label,
    disabled,
    required,
    value,
    error = null,
    onChange,
        defaultValue,
    multiple,
    options,
    ...other
  },
  props
) {
  const theme = useTheme();
  const classes = commonStyles();
  return (
    <FormControl fullWidth variant="outlined" {...(error && { error: true })}>
      {label && (
        <InputLabel>{`${label}${props.required ? ` *` : ``}`}</InputLabel>
      )}
      <MuiSelect
        value={value ?? ""}
        label={label && `${label}${props.required ? `*` : ``}`}
        name={name}
        onChange={onChange}
        className={className ?? classes.inputContainer}
        sx={{
          [theme.breakpoints.up("md")]: {
            width: "30vw", // Adjust width for screens wider than 'md' breakpoint
            alignSelf:"center"
          },
        }}
        fullWidth
        disabled={disabled}
        multiple={multiple}
        required={required}
        {...(error && { error: true, helperText: error })}
        displayEmpty
        {...other}
      >
        {defaultValue && (
          <MenuItem value="">
            <em>{defaultValue}</em>
          </MenuItem>
        )}
        {props.children ? props.children : null}
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
