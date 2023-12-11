// interestsSlice.js
import chipSlice from "./chipSlice";

const interestsSlice = chipSlice("interests");

export const {
  setSearchText,
  addSelectedChip,
  removeSelectedChip,
  fetchData,
  fetchDataSuccess,
  fetchDataFailure,
  fetchInterests,
  setChipData,
} = interestsSlice.actions;

export default interestsSlice.reducer;
