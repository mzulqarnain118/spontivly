import { Container } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import {
  addSelectedChip,
  removeSelectedChip,
  fetchInterests,
  setSearchText,
} from "../../redux/interestsSlice";
import commonStyles from '../../styles/commonStyles';
import common from '../../components/common'
function Interests() {
    const classes = commonStyles();
    const { selectedChips, nextPage, searchText, filterChipData } = useSelector((state) => state.interests);

    return (
      <>
        <common.FormHeading
          heading="What are your interests?"
          title="Select all that apply"
        />
        <Container className={classes.mainContainer}>
          <common.SearchInput
            placeholder="Search Interests"
            value={searchText}
            onChange={setSearchText}
          />
          <common.SearchTags
            selectedChips={selectedChips}
            nextPage={nextPage}
            filterChipData={filterChipData}
            addSelectedChip={addSelectedChip}
            removeSelectedChip={removeSelectedChip}
            fetchTags={fetchInterests}
          />
        </Container>
      </>
    );
}

export default React.memo(Interests)
