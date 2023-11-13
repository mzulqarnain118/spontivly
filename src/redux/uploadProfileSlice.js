// uploadProfileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const uploadProfileSlice = createSlice({
  name: "photo",
  initialState: {
    photo: {},
  },
  reducers: {
    setPhotoURL: (state, action) => {
      state.photo = action.payload;
    },
    fetchDataSuccess: (state, action) => {
      state.locations = action.payload.response.results;
      state.loading = false;
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPhotoURL, fetchDataSuccess, fetchDataFailure } =
  uploadProfileSlice.actions;
export default uploadProfileSlice.reducer;
