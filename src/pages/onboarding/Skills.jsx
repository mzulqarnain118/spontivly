import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedChip, removeSelectedChip, setSearchText } from '../../redux/skillsSlice';
import { useTheme } from '@mui/material/styles';
import { TextField, Chip, Button, Typography, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import skillsStyles from '../../styles/components/skillsStyles';
import { createAction } from '@reduxjs/toolkit'
const fetchSkills = createAction('skills/fetchSkills');
function Skills() {
  const dispatch = useDispatch();
  const classes = skillsStyles();
  const { selectedChips, nextPage, searchText, filterChipData } = useSelector((state) => state.skills);

  const theme = useTheme();
  const handleClearClick = useCallback(() => {
    dispatch(setSearchText(''))
  });
  const handleTextChange = useCallback((e) => {
    const query = e.target.value;
    dispatch(setSearchText(query))
  });

  const handleAddToSelectedChips = useCallback((chipToAdd) => () => {
    if (!selectedChips.find((chip) => chip.id === chipToAdd.id)) {
      dispatch(addSelectedChip(chipToAdd));
    }
  }, [selectedChips]);

  const handleRemoveFromSelectedChips = useCallback((chipToRemove) => () => {
    dispatch(removeSelectedChip(chipToRemove));
  });
  useEffect(() => {
    dispatch(fetchSkills());

  }, []);
  const handleLoadMore = () => {
    const urlObj = new URL(nextPage);
    const page = urlObj.searchParams.get('page');
    dispatch(fetchSkills(page));

  };


  return (
    <>
      <Typography className={classes.heading}>What are your skills?</Typography>
      <span className={classes.title}
      >
        Select all that apply
      </span>
      <Container className={classes.mainContainer}>
        <TextField
          variant="outlined"
          placeholder="Search Skills"
          value={searchText}
          onChange={handleTextChange}
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
              width: '30vw',
            },
          }}
        />

        <Container className={classes.chipContainer}
        >

          {selectedChips.map((data, index) => (
            <>
              <Chip
                key={data.id}
                label={data.title}
                size="medium"
                onDelete={handleRemoveFromSelectedChips(data)}
                deleteIcon={<ClearIcon />}
                className={classes.selectedChip}
              />
              {(index + 1) % 4 === 0 && <div style={{ flexBasis: "100%" }} />}
            </>
          ))}
        </Container>

        <Container className={classes.selectedchipContainer}
        >
          {filterChipData.map((data, index) => (
            <>
              <Chip
                key={data.id}
                label={data.title}
                onClick={handleAddToSelectedChips(data)}
                className={classes.chip}
              />
              {(index + 1) % 4 === 0 && <div style={{ flexBasis: "100%" }} />}
            </>
          ))}


        </Container>
        {nextPage && (
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            className={classes.loadMoreButton}
          >
            Load More
          </Button>
        )}
      </Container>
    </>
  )
}

export default Skills
