import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    searchText: '',
    selectedLocation:null,
    locations: [],
    error: null
  },
  reducers: {
    setLocationText: (state, action) => {
      state.searchText = action.payload;
      state.loading = true;
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    fetchDataSuccess: (state, action) => {

      state.locations = action.payload.response.results
      state.loading = false
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLocationText, fetchDataSuccess,setSelectedLocation, fetchDataFailure } = locationSlice.actions;
export default locationSlice.reducer;