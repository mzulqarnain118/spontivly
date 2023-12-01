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
    valueUpdater,
    defaultValue,
    multiple,
    register,
    listUpdater,
    reduxValueUpdater,
    reduxListUpdater,
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
      if (reduxValueUpdater) {
        dispatch(reduxValueUpdater(value));
      } else if (reduxListUpdater) {
        dispatch(reduxListUpdater({ [name]: value }));
      } else if (listUpdater) {
        listUpdater((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      } else if (valueUpdater) {
        valueUpdater(value);
      }
    },
    [dispatch, reduxValueUpdater, reduxListUpdater, listUpdater, valueUpdater]
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
        {...register}
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
