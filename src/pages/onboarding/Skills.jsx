import React from 'react';
import { useSelector } from 'react-redux';
import { addSelectedChip, removeSelectedChip, setSearchText } from '../../redux/skillsSlice';
import {  Container } from '@mui/material';
import skillsStyles from '../../styles/components/skillsStyles';
import { createAction } from '@reduxjs/toolkit'
import common from '../../components/common';
const fetchSkills = createAction('skills/fetchSkills');

function Skills() {
  const classes = skillsStyles();
  const { selectedChips, nextPage,searchText, filterChipData } = useSelector((state) => state.skills);

  return (
    <>
      <common.FormHeading
        heading="What are your skills?"
        title="Select all that apply"
      />
      <Container className={classes.mainContainer}>
        <common.SearchInput
          placeholder="Search Skills"
          value={searchText}
          onChange={setSearchText}
        />
        <common.SearchTags
          selectedChips={selectedChips}
          nextPage={nextPage}
          filterChipData={filterChipData}
          addSelectedChip={addSelectedChip}
          removeSelectedChip={removeSelectedChip}
          fetchTags={fetchSkills}
        />
      </Container>
    </>
  );
}

export default Skills
