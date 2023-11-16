import { createSlice } from '@reduxjs/toolkit';

const skillsSlice = createSlice({
  name: "skills",
  initialState: {
    nextPage: null,
    activeStep: 6,
    previousPage: null,
    selectedChips: [],
    searchText: "",
    chipData: [],
    filterChipData: [],
    loading: false,
  },
  reducers: {
    addSelectedChip: (state, action) => {
      state.selectedChips.push(action.payload);
      state.filterChipData = state.filterChipData.filter(
        (chip) => chip.id !== action.payload.id
      );
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
      state.filterChipData = state.chipData
        .filter((chip) =>
          chip.name.toLowerCase().includes(action.payload.toLowerCase())
        )
        .filter((chip) => {
          return state.selectedChips.every(
            (selectedChip) => selectedChip.name !== chip.name
          );
        });
    },
    handleNext: (state, action) => {
      state.activeStep += 1;
    },
    handleBack: (state, action) => {
      state.activeStep -= 1;
    },
    removeSelectedChip: (state, action) => {
      state.selectedChips = state.selectedChips.filter(
        (chip) => chip.id !== action.payload.id
      );
      state.chipData.push(action.payload);
      state.filterChipData.push(action.payload);
    },
    fetchSkills: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.chipData =
        action.payload.page == true
          ? state.chipData.concat(action.payload.response.results)
          : action.payload.response.results;
      state.filterChipData = state.chipData
        .filter((chip) =>
          chip.name.toLowerCase().includes(state.searchText.toLowerCase())
        )
        .filter((chip) => {
          return state.selectedChips.every(
            (selectedChip) => selectedChip.name !== chip.name
          );
        });
      state.nextPage = action.payload.response.next;
      state.previousPage = action.payload.response.previous;
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.error = action.payload;
    },
    handleLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setSearchText,
  addSelectedChip,
  removeSelectedChip,
  fetchDataSuccess,
  handleNext,
  handleBack,
  fetchDataFailure,
  fetchSkills,
  handleLoading,
} = skillsSlice.actions;
export default skillsSlice.reducer;