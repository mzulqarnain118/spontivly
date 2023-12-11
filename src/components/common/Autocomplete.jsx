import React, { useState } from "react";
import {
  Autocomplete as MuiAutocomplete,
  Chip,
  TextField,
} from "@mui/material";
import { ApiCall } from "utils";

function Autocomplete({
  options,
  addNewTag,
  value,
  onChange,
  required,
  placeholder,
  label,
  variant,
  ...other
}) {
  const [inputValue, setInputValue] = useState('');
  const [newOptions, setNewOptions] = useState(options);

  const handleChange = (event, newValue) => {
    const updatedTags = newValue.map((value) => {
      if (typeof value === "string") {
        addNewTag(value);
        return { id: null, title: value };
      } else {
        return value;
      }
    });
    onChange(updatedTags);
  };
  const handleTextChange = async (event, newInputValue) => {
    setInputValue(newInputValue)
    const apiUrl = `tags?name=${newInputValue}`;
    const response = await ApiCall(apiUrl);
    setNewOptions(response?.results)
    console.log('response', response?.results)
  };
  return (
    <MuiAutocomplete
      multiple
      id="tags-filled"
      options={newOptions}
      getOptionLabel={(option) => option.title}
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleTextChange}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) =>
          typeof option === "string" ? (
            <Chip
              key={index}
              variant={variant}
              label={option}
              {...getTagProps({ index })}
            />
          ) : (
            <Chip
              key={option.id}
              variant={variant}
              label={option.title}
              {...getTagProps({ index })}
            />
          )
        )
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant={variant}
          label={label}
          required={required && value.length === 0}
          placeholder={placeholder}
        />
      )}
      {...other}
    />
  );
}

export default Autocomplete;
