import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const NewSearchInput = ({ onSearchTextChange }) => {
  const [searchText, setSearchText] = React.useState('');


  const handleClearClick = () => {
    setSearchText('');
    onSearchTextChange('');
  };

  const handleSearchTextChange = (e) => {
    const newText = e.target.value;
    setSearchText(newText);
    onSearchTextChange(newText);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search"
      value={searchText}
      onChange={handleSearchTextChange}
      InputProps={{
        startAdornment: (
          <IconButton disabled>
            <SearchIcon />
          </IconButton>
        ),
        endAdornment: searchText && (
          <IconButton onClick={handleClearClick}>
            <ClearIcon />
          </IconButton>
        ),
      }}
      style={{
        marginTop:'24px',
        backgroundColor: 'var(--petroleum-p05)', // Replace with your desired background color
        borderRadius: '8px', // Set the border radius
      }}
    />
  );
};

export default NewSearchInput;
