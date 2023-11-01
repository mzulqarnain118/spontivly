// bioSlice.js
import { createSlice } from '@reduxjs/toolkit';

const bioSlice = createSlice({
  name: 'bio',
  initialState: {
    bioText: '', // Store the bio text
  },
  reducers: {
    setBioText: (state, action) => {
      state.bioText = action.payload;
    },
  },
});

export const { setBioText } = bioSlice.actions;
export default bioSlice.reducer;
