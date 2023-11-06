import React, { useCallback } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import commonStyles from "../../styles/commonStyles";
import { useTheme } from "@mui/material/styles";

export default function SearchInput(
  {
    className,
    name,
    label,
    value,
    defaultValue,
    error = null,
    onChange,
    ...other
  },
  props
) {
  const theme = useTheme();
  const classes = commonStyles();
  const dispatch = useDispatch();

  const handleClearClick = useCallback(() => {
    dispatch(onChange(""));
  }, [dispatch]);
  
  const handleTextChange = useCallback((e) => {
    const query = e.target.value;
    dispatch(onChange(query));
  });

  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={handleTextChange}
      onWheel={(e) => {
        if (props?.inputProps?.type === "number") e.target.blur();
      }}
      defaultValue={defaultValue}
      InputProps={{
        startAdornment: (
          <IconButton disabled>
            <SearchIcon />
          </IconButton>
        ),
        endAdornment: value && (
          <IconButton onClick={handleClearClick}>
            <ClearIcon />
          </IconButton>
        ),
      }}
      className={className ?? classes.searchInput}
      sx={{
        [theme.breakpoints.up("md")]: {
          width: "30vw",
        },
      }}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
