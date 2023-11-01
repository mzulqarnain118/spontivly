// photoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const photoSlice = createSlice({
  name: 'photo',
  initialState: {
    photoURL: '', // Store the photo URL
  },
  reducers: {
    setPhotoURL: (state, action) => {
      state.photoURL = action.payload;
    },
  },
});

export const { setPhotoURL } = photoSlice.actions;
export default photoSlice.reducer;
