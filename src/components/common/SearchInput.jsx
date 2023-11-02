import React, { useCallback } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import skillsStyles from "../../styles/components/skillsStyles";
import { useTheme } from "@mui/material/styles";
import {
  setSearchText,
} from "../../redux/skillsSlice";


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
  const classes = skillsStyles();

  const { searchText } = useSelector((state) => state.skills);
  const dispatch = useDispatch();
  const handleClearClick = useCallback(() => {
    dispatch(setSearchText(""));
  });
  const handleTextChange = useCallback((e) => {
    const query = e.target.value;
    dispatch(setSearchText(query));
  });

  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      name={name}
      value={value ?? searchText}
      onChange={onChange ?? handleTextChange}
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
