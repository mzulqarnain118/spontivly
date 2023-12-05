import React, { useCallback } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import commonStyles from "../../styles/commonStyles";
import { debounce } from "utils";

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
    readOnly,
    register,
    valueUpdater,
    listUpdater,
    reduxValueUpdater,
    reduxListUpdater,
    customHandleChange,
    multiline,
    rows,
    ...other
  },
  props
) {
  const classes = commonStyles();
  const dispatch = useDispatch();

  const handleClearClick = useCallback(() => {
    reduxValueUpdater ? dispatch(reduxValueUpdater("")) : valueUpdater("");
  }, [dispatch]);

const handleChange = useCallback(
  (e) => {
    const { name, value } = e.target;

    if (reduxValueUpdater) {
      dispatch(reduxValueUpdater(value));
    } else if (reduxListUpdater) {
      dispatch(reduxListUpdater({ [name]: value }));
    } else if (listUpdater) {
      const updateFunction = (prevFormData) => ({
        ...prevFormData,
        [name]: value,
      });

      if (props.debounce) {
        const debouncedUpdate = debounce(listUpdater, 500); // Adjust the debounce delay as needed
        debouncedUpdate(updateFunction);
      } else {
        listUpdater(updateFunction);
      }
    } else if (valueUpdater) {
      valueUpdater(value);
    }
  },
  [
    dispatch,
    reduxValueUpdater,
    reduxListUpdater,
    listUpdater,
    valueUpdater,
    props.debounce,
  ]
);



  return (
    <TextField
      fullWidth
      variant="outlined"
      multiline={multiline}
      rows={rows}
      label={label}
      name={name}
      value={value}
      {...register}
      onChange={customHandleChange ?? handleChange}
      defaultValue={defaultValue}
      InputProps={{
        readOnly: readOnly,
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
     reduxValueUpdater={setSearchText}
     value={searchText}
     valueUpdater={setLocationText}
     customHandleClearClick={customHandleClearClick}
   />;
   */
