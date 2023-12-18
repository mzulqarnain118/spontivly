// interestsSlice.js
import chipSlice from "./chipSlice";

const interestsSlice = chipSlice("interests");

export const {
  setSearchText,
  addSelectedChip,
  removeSelectedChip,
  setChipData,
} = interestsSlice.actions;

export default interestsSlice.reducer;
