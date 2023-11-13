import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";
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
    objOnChange,
    reduxHandleChange,
    reduxObjHandleChange,
    customHandleChange,
    options,
    ...other
  },
  props
) {
  const classes = commonStyles();
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      reduxHandleChange
        ? dispatch(reduxHandleChange(value))
        : reduxObjHandleChange
        ? dispatch(reduxObjHandleChange({ [name]: value }))
        : objOnChange
        ? objOnChange((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }))
        : onChange(value);
    },
    [dispatch]
  );

  return (
    <FormControl fullWidth variant="outlined" {...(error && { error: true })}>
      {label && (
        <InputLabel>{`${label}${props.required ? ` *` : ``}`}</InputLabel>
      )}
      <MuiSelect
        value={value ?? ""}
        label={label && `${label}${props.required ? `*` : ``}`}
        name={name}
        onChange={customHandleChange ?? handleChange}
        className={className ?? classes.inputContainer}
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
