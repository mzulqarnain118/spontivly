// objectiveSlice.js
import chipSlice from "./chipSlice";

const objectiveSlice = chipSlice("objective");

export const {
  setSearchText,
  addSelectedChip,
  removeSelectedChip,
  setChipData,
} = objectiveSlice.actions;

export default objectiveSlice.reducer;
