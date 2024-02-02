import { Autocomplete as MuiAutocomplete, Chip, TextField } from '@mui/material'
import React from 'react'

function Autocomplete({
  options,
  value,
  onChange,
  multiple,
  placeholder,
  label,
  variant,
  className,
  inputValue,
  addOption=true,
  setInputValue,
  required,
  ...other
}) {
  const handleChange = (event, newValue) => {
    addOption && onChange(newValue)
  }
  const handleTextChange = (event, newInputValue) => {
    setInputValue(newInputValue)
  }

  return (
    <MuiAutocomplete
      multiple={multiple ?? true}
      id="tags-filled"
      className={className}
      options={options}
      getOptionLabel={(option) => option?.title ?? option?.user?.email ?? option?.name}
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleTextChange}
      freeSolo
      renderTags={(value, getTagProps) =>
        value?.map((option, index) => (
          <Chip
            key={typeof option === 'string' ? option : option?.id}
            variant={variant}
            label={typeof option === 'string' ? option : option?.title ?? option?.user?.email ?? option?.name}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} variant={variant} label={label} placeholder={placeholder} required={required && value?.length == 0} />
      )}
      {...other}
    />
  )
}

export { Autocomplete }
