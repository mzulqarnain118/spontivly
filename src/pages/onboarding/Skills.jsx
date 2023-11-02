import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedChip, removeSelectedChip, setSearchText } from '../../redux/skillsSlice';
import {  Chip, Button, Typography, Container } from '@mui/material';
import skillsStyles from '../../styles/components/skillsStyles';
import { createAction } from '@reduxjs/toolkit'
import common from '../../components/common';
import ClearIcon from "@mui/icons-material/Clear";
const fetchSkills = createAction('skills/fetchSkills');

function Skills() {
  const dispatch = useDispatch();
  const classes = skillsStyles();
  const { selectedChips, nextPage, filterChipData } = useSelector((state) => state.skills);
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
      <common.FormHeading heading="What are your skills?"  title="Select all that apply"/>
      <Container className={classes.mainContainer}>
        <common.SearchInput placeholder="Search Skills" />
        <Container className={classes.chipContainer}>
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

        <Container className={classes.selectedchipContainer}>
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
  );
}

export default Skills
