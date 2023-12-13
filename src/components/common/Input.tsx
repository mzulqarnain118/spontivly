import { useCallback } from 'react';
import { ClassNameMap, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import commonStyles from '../../styles/commonStyles';

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
    customHandleChange,
    multiline,
    rows,
    ...other
  }: any,
  props: any
) {
  const classes: ClassNameMap<any> = commonStyles();

  const handleClearClick = useCallback((e: any) => {
    const { name } = e.target;

    if (listUpdater) {
      listUpdater((prevFormData: any) => ({
        ...prevFormData,
        [name]: "",
      }));
      }
     else if (valueUpdater) {
      valueUpdater("");
    }
  }, [listUpdater, valueUpdater]
);

  const handleChange = useCallback(
    (e: any) => {
      const { name, value } = e.target;
      if (listUpdater) {
        listUpdater((prevFormData: any) => ({
          ...prevFormData,
          [name]: value,
        }));
      } else if (valueUpdater) {
        valueUpdater(value);
      }
    },
    [listUpdater, valueUpdater]
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
