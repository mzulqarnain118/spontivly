import {
  Autocomplete as MuiAutocomplete,
  Chip,
  TextField,
} from "@mui/material";

function Autocomplete({
  options,
  addNewTag,
  value,
  onChange,
  required,
  placeholder,
  label,
  variant,
  inputValue, setInputValue,
  ...other
}) {

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
  };
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
