import { Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { setLocationText } from '../../redux/locationSlice'; // Import your action
import { useTheme } from '@mui/material/styles';
import commonStyles from '../../styles/components/commonStyles';
function Location() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = commonStyles();
    const searchText = useSelector((state) => state.location.searchText);
  
  const handleClearClick = () => {
    dispatch(setLocationText(''));
};
  return (
    <>
     <Typography className={classes.heading}>Where are you located?</Typography>
    
    <span
        className={classes.title}
    >
        Tell us what city you’re based in
    </span>
    <Container className={classes.mainContainer}>
        <TextField
            variant="outlined"
            placeholder="Search Location"
            value={searchText}
            onChange={(e) => {
                const query = e.target.value;
                dispatch(setLocationText(query))
            }}
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
            className={classes.searchInput}
            sx={{
                [theme.breakpoints.up('md')]: {
                  width: '30vw', // Adjust width for screens wider than 'md' breakpoint
                },
            }}
        />
    </Container>
    </>
  )
}

export default React.memo(Location)
