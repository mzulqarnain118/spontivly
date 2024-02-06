import { Autocomplete as MuiAutocomplete, Chip, TextField } from '@mui/material'
import React from 'react'

function Autocomplete(
  {
    options,
    onChange,
    multiple = true,
    placeholder,
    label,
    variant,
    className,
    inputValue,
    addNewOption = true,
    setInputValue,
    defaultValue,
    required,
    value,
    renderLabel,
    ...other
  },
  props
) {
  const handleChange = (event, newValue) => {
    if (!multiple || addNewOption) {
      onChange(newValue)
    } else {
      const selectedValues = newValue?.filter((item) => typeof item !== 'string')

      console.log('🚀 ~ handleChange ~ selectedValues:', selectedValues)

      onChange(selectedValues)
    }
  }
  const handleTextChange = (event, newInputValue) => {
    setInputValue(newInputValue)
  }

  return (
    <MuiAutocomplete
      multiple={multiple}
      id="tags-filled"Pbio
      className={className}
      options={options}
      getOptionLabel={(option) => (renderLabel ? renderLabel(option) : option?.title ?? option?.user?.email ?? option?.name)}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleTextChange}
      freeSolo
      renderTags={(value, getTagProps) =>
        value?.map((option, index) => (
          <Chip
            key={typeof option === 'string' ? option : option?.id}
            variant={variant}
            label={
              typeof option === 'string' ? option : renderLabel ? renderLabel(option) : option?.title ?? option?.user?.email ?? option?.name
            }
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
