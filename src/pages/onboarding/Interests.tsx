import  { memo } from 'react'
import { useSelector } from "react-redux";
import {
  addSelectedChip,
  removeSelectedChip,
  setSearchText,
  setChipData,
} from "../../redux/interestsSlice";
import common from "../../components/common";
import SearchTags from "./SearchTags";

function Interests() {
  const { selectedChips, searchText, filterChipData } = useSelector(
    (state: any) => state.interests
  );
  return (
    <>
      <common.FormHeading
        heading="What are your interests?"
        title="Select all that apply"
      />

      <SearchTags
        selectedChips={selectedChips}
        filterChipData={filterChipData}
        addSelectedChip={addSelectedChip}
        removeSelectedChip={removeSelectedChip}
        queryKey="interests"
        placeholder="Search Interests"
        searchText={searchText}
        setSearchText={setSearchText}
        setChipData={setChipData}
      />
    </>
  );
}

export default memo(Interests);
