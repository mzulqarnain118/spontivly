import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText, TextField } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import commonStyles from "../../styles/components/commonStyles";
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
        className={className ?? classes.select}
        sx={{
          [theme.breakpoints.up("md")]: {
            width: "30vw", // Adjust width for screens wider than 'md' breakpoint
          },
        }}
        disabled={disabled}
        multiple={multiple}
        required={required}
        fullWidth
        {...(error && { error: true, helperText: error })}
        renderInput={(params) => (
          <TextField
            {...params}
            {...props}
            fullWidth
            label={label}
            variant="outlined"
          />
        )}
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
