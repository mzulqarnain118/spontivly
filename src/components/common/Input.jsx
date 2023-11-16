import React, { useCallback } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import commonStyles from "../../styles/commonStyles";
import { useTheme } from "@mui/material/styles";

export default function Input(
  {
    className,
    name,
    label,
    value,
    defaultValue,
    customHandleClearClick,
    error = null,
    startIcon,
    endIcon,
    onChange,
    objOnChange,
    reduxHandleChange,
    reduxObjHandleChange,
    customHandleChange,
    required,
    multiline,rows,
    ...other
  },
  props
) {
  const classes = commonStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleClearClick = useCallback(() => {
    reduxHandleChange ? dispatch(reduxHandleChange("")) : onChange("");
  }, [dispatch]);

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
    <TextField
      isRequired={required}
      fullWidth
      variant="outlined"
      multiline={multiline}
      rows={rows}
      label={label}
      name={name}
      value={value}
      onChange={customHandleChange ?? handleChange}
      onWheel={(e) => {
        if (props?.inputProps?.type === "number") e.target.blur();
      }}
      defaultValue={defaultValue}
      InputProps={{
        startAdornment: startIcon && (
          <IconButton disabled>
            <SearchIcon />
          </IconButton>
        ),
        endAdornment: endIcon && value && (
          <IconButton onClick={customHandleClearClick ?? handleClearClick}>
            <ClearIcon />
          </IconButton>
        ),
      }}
      className={className ?? classes.inputContainer}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}

//TODO CALLING
/* 
  <common.Input
     placeholder="Search"
     reduxHandleChange={setSearchText}
     value={searchText}
     onChange={setLocationText}
     customHandleClearClick={customHandleClearClick}
   />;
   */
