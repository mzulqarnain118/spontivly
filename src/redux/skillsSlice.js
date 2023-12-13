// skillsSlice.js
import chipSlice from "./chipSlice";

const skillsSlice = chipSlice("skills");

export const {
  setSearchText,
  addSelectedChip,
  removeSelectedChip,
  

  handleNext,
  handleBack,
  handleLoading,
  setChipData,
} = skillsSlice.actions;

export default skillsSlice.reducer;
