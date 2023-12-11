// objectiveSlice.js
import chipSlice from "./chipSlice";

const objectiveSlice = chipSlice("objective");

export const {
  setSearchText,
  addSelectedChip,
  removeSelectedChip,
  fetchData,
  fetchDataSuccess,
  fetchDataFailure,
  setChipData,
} = objectiveSlice.actions;

export default objectiveSlice.reducer;
