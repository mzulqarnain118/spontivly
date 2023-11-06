import { Container } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import {
  addSelectedChip,
  removeSelectedChip,
  fetchObjectives,
  setSearchText,
} from "../../redux/objectiveSlice";
import commonStyles from '../../styles/commonStyles';
import common from '../../components/common'
function Objective() {
    const classes = commonStyles();
    const { selectedChips, nextPage, searchText, filterChipData } = useSelector((state) => state.objective);

    return (
      <>
        <common.FormHeading
          heading="What’s your objective?"
          title="Select all that apply"
        />
        <Container className={classes.mainContainer}>
          <common.SearchInput
            placeholder="Search Objective"
            value={searchText}
            onChange={setSearchText}
          />
          <common.SearchTags
            selectedChips={selectedChips}
            nextPage={nextPage}
            filterChipData={filterChipData}
            addSelectedChip={addSelectedChip}
            removeSelectedChip={removeSelectedChip}
            fetchTags={fetchObjectives}
          />
        </Container>
      </>
    );
}

export default React.memo(Objective)

