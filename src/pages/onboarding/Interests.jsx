import { Container,Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import {
  addSelectedChip,
  removeSelectedChip,
  fetchInterests,
  setSearchText,
} from "../../redux/interestsSlice";
import commonStyles from "../../styles/commonStyles";
import common from "../../components/common";
function Interests() {
  const classes = commonStyles();
  const { selectedChips, nextPage, searchText, filterChipData } = useSelector(
    (state) => state.interests
  );

  return (
    <>
      <common.FormHeading
        heading="What are your interests?"
        title="Select all that apply"
      />
      <Container maxWidth="sm" className={classes.container}>
        <Box className={classes.mainContainer}>
          <common.Input
            placeholder="Search Interests"
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
        fetchTags={fetchInterests}
      />
    </>
  );
}

export default React.memo(Interests);
