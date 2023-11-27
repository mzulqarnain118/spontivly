import React from "react";
import { Autocomplete as MuiAutocomplete, Chip, TextField } from "@mui/material";

function Autocomplete({
    options,
    value,
    onChange,
    placeholder,
    label,
    variant,
    ...other
}) {
    const handleChange = (event, newValue) => {
        const updatedTags = newValue.map((value) =>
            typeof value === 'string' ? { id: null, title: value } : value
        );
        console.log('updatedTags', updatedTags)

        onChange(updatedTags);

    }
    return (
        <MuiAutocomplete
            multiple
            id="tags-filled"
            options={options}
            getOptionLabel={(option) => option.title}
            value={value}
            onChange={handleChange}
            freeSolo
            renderTags={(value, getTagProps) =>
                value.map((option, index) =>
                    typeof option === 'string' ? (
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
                    placeholder={placeholder}
                />
            )}
            {...other}
        />
    )
}

export default Autocomplete
