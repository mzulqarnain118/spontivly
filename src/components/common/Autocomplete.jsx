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
  addNewOption = true,
  setInputValue,
  required,
  renderLabel,
  ...other
}) {
  const handleChange = (event, newValue) => {
    if (addNewOption) {
      onChange(newValue)
    } else {
      const lastSelectedItemId = newValue?.[value?.length]?.id ?? null
      const selectedValues = newValue.filter((item) => typeof item !== 'string')
      // Check if the last selected item's ID already exists in selected values
      const isLastItemDuplicate = value.some((item) => item.id === lastSelectedItemId)

      // Exclude the last selected item if it's a duplicate
      if (isLastItemDuplicate && value.length !== 0) {
        const uniqueSelectedValues = selectedValues.filter((item) => item.id !== lastSelectedItemId)

        onChange(uniqueSelectedValues)
      } else onChange(selectedValues)
    }
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
      getOptionLabel={(option) => (renderLabel ? renderLabel(option) : option?.title ?? option?.user?.email ?? option?.name)}
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
