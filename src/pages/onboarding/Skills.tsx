import { useSelector } from 'react-redux';
import {
  addSelectedChip,
  removeSelectedChip,
  setSearchText,
} from '../../redux/skillsSlice';
import { Container, Box, ClassNameMap } from '@mui/material';
import commonStyles from '../../styles/commonStyles';
import { createAction } from '@reduxjs/toolkit';
import common from '../../components/common';
const fetchSkills = createAction('skills/fetchSkills');

function Skills() {
  const classes: ClassNameMap<any> = commonStyles();
  const { selectedChips, nextPage, searchText, filterChipData } = useSelector(
    (state: any) => state.skills
  );
  return (
    <>
      <common.FormHeading
        heading="What are your skills?"
        title="Select all that apply"
      />
      <Container maxWidth="sm" className={classes.container}>
        <Box className={classes.mainContainer}>
          <common.Input
            placeholder="Search Skills"
            value={searchText}
            reduxValueUpdater={setSearchText}
            startIcon={true}
            endIcon={true}
          />
        </Box>
      </Container>
      <common.SearchTags
        selectedChips={selectedChips}
        nextPage={nextPage}
        filterChipData={filterChipData}
        addSelectedChip={addSelectedChip}
        removeSelectedChip={removeSelectedChip}
        fetchTags={fetchSkills}
      />
    </>
  );
}

export default Skills;
