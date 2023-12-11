import { createSlice } from "@reduxjs/toolkit";

const chipSlice = (name) =>
  createSlice({
    name,
    initialState: {
      nextPage: null,
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
      removeSelectedChip: (state, action) => {
        state.selectedChips = state.selectedChips.filter(
          (chip) => chip.id !== action.payload.id
        );
        state.chipData.push(action.payload);
        state.filterChipData.push(action.payload);
      },
      fetchData: (state) => {
        state.loading = true;
      },
      setChipData: (state, action) => {

        console.log("🚀 ~ file: chipSlice.js:46 ~ action:", action.payload);

        
           state.chipData = action.payload;
           state.filterChipData = state.chipData?.filter((chip) =>
               chip.name.toLowerCase().includes(state.searchText.toLowerCase())
             )
             .filter((chip) => {
               return state.selectedChips.every(
                 (selectedChip) => selectedChip.name !== chip.name
               );
             });
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
    },
  });

export default chipSlice;
