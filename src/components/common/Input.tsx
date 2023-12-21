import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { ClassNameMap, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useCallback, useMemo } from 'react'
import { commonStyles } from '../../styles/commonStyles'
import { debounce } from '../../utils'

export function Input(
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
    onChange: customOnChange, // Rename onChange prop to customOnChange
    customHandleChange,
    multiline,
    rows,
    ...other
  }: any,
  props: any
) {
  const classes: ClassNameMap<any> = commonStyles()
  // Create a separate debounced function using useMemo
  const debouncedUpdate = useMemo(() => debounce(listUpdater, 500), [listUpdater])

  const handleClearClick = useCallback(
    (e: any) => {
      const { name } = e.target

      if (listUpdater) {
        listUpdater((prevFormData: any) => ({
          ...prevFormData,
          [name]: ''
        }))
      } else if (valueUpdater) {
        valueUpdater('')
      }
    },
    [listUpdater, valueUpdater]
  )

  const handleChange = useCallback(
    (e: any) => {
      const { name, value } = e.target

      if (listUpdater) {
        const updateFunction = (prevFormData: any) => ({
          ...prevFormData,
          [name]: value
        })

        if (props.debounce) {
          // Use the memorized debounced callback
          debouncedUpdate(updateFunction)
        } else {
          // Call the updater directly without debounce
          listUpdater(updateFunction)
        }
      } else if (valueUpdater) {
        if (props.debounce) {
          // Use the memorized debounced callback
          debouncedUpdate(value)
        } else {
          // Call the updater directly without debounce
          listUpdater(value)
        }
      } else {
        customOnChange(e)
      }
    },
    [debouncedUpdate, listUpdater, valueUpdater, props.debounce]
  )

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
        )
      }}
      className={className ?? classes.inputContainer}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  )
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
