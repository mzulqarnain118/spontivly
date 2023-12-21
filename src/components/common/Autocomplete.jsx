import { Autocomplete as MuiAutocomplete, Chip, TextField } from '@mui/material'
import React from 'react'

function Autocomplete({ options, value, onChange, placeholder, label, variant, inputValue, setInputValue, ...other }) {
  const handleChange = (event, newValue) => {
    onChange(newValue)
  }

  const handleTextChange = (event, newInputValue) => {
    setInputValue(newInputValue)
  }

  return (
    <MuiAutocomplete
      multiple
      id="tags-filled"
      options={options}
      getOptionLabel={(option) => option?.title}
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleTextChange}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={typeof option === 'string' ? option : option.id}
            variant={variant}
            label={typeof option === 'string' ? option : option.title}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => <TextField {...params} variant={variant} label={label} placeholder={placeholder} />}
      {...other}
    />
  )
}

export { Autocomplete }
