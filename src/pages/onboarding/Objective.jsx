import { Container, Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import {
  addSelectedChip,
  removeSelectedChip,
  fetchObjectives,
  setSearchText,
} from "../../redux/objectiveSlice";
import commonStyles from "../../styles/commonStyles";
import common from "../../components/common";
function Objective() {
  const classes = commonStyles();
  const { selectedChips, nextPage, searchText, filterChipData } = useSelector(
    (state) => state.objective
  );

  return (
    <>
      <common.FormHeading
        heading="What’s your objective?"
        title="Select all that apply"
      />
      <Container maxWidth="sm" className={classes.container}>
        {/* <Box className={classes.mainContainer}> */}
          <common.Input
            placeholder="Search Objective"
            value={searchText}
            reduxHandleChange={setSearchText}
            startIcon={true}
            endIcon={true}
          />
        {/* </Box> */}
      </Container>
      <common.SearchTags
        selectedChips={selectedChips}
        nextPage={nextPage}
        filterChipData={filterChipData}
        addSelectedChip={addSelectedChip}
        removeSelectedChip={removeSelectedChip}
        fetchTags={fetchObjectives}
      />
    </>
  );
}

export default React.memo(Objective);
