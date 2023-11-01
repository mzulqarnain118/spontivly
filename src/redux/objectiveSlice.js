// objectiveSlice.js
import { createSlice } from '@reduxjs/toolkit';

const objectiveSlice = createSlice({
  name: 'objective',
  initialState: {
    nextPage: null,
    previousPage: null,
    selectedChips: [],
    searchText: '',
    chipData: [],
    filterChipData: [],
    loading: false,
  },

  reducers: {
    addSelectedChip: (state, action) => {
      state.selectedChips.push(action.payload);
      state.filterChipData = state.filterChipData.filter((chip) => chip.id !== action.payload.id);
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
      state.filterChipData = state.chipData
        .filter((chip) =>
          chip.name.toLowerCase().includes(action.payload.toLowerCase())
        )
        .filter((chip) => {
          return state.selectedChips.every((selectedChip) => selectedChip.name !== chip.name);
        });
    },

    removeSelectedChip: (state, action) => {
      state.selectedChips = state.selectedChips.filter((chip) => chip.id !== action.payload.id);
      state.chipData.push(action.payload);
      state.filterChipData.push(action.payload)
    },
    fetchObjectives: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {

      state.chipData = action.payload.page == true ? state.chipData.concat(action.payload.response.results) : action.payload.response.results;
      state.filterChipData = state.chipData
        .filter((chip) =>
          chip.name.toLowerCase().includes(state.searchText.toLowerCase())
        )
        .filter((chip) => {
          return state.selectedChips.every((selectedChip) => selectedChip.name !== chip.name);
        })
      state.nextPage = action.payload.response.next;
      state.previousPage = action.payload.response.previous
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSearchText, addSelectedChip, removeSelectedChip, fetchDataSuccess, fetchDataFailure, fetchObjectives } = objectiveSlice.actions;

export default objectiveSlice.reducer;
