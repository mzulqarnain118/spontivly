import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    searchText: '',
  },
  reducers: {
    setLocationText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { setLocationText } = locationSlice.actions;
export default locationSlice.reducer;