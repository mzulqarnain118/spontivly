import { createSlice } from '@reduxjs/toolkit';

const socialSlice = createSlice({
  name: 'social',
  initialState: {
    linkedInChecked:null, // Store the photo URL
    twitterChecked:null, // Store the photo URL
    facebookChecked:null, // Store the photo URL
    instaChecked:null, // Store the photo URL
  },
  reducers: {
    setLinkedInChecked: (state, action) => {
      state.linkedInChecked = action.payload;
    },
    setTwitterChecked: (state, action) => {
      state.twitterChecked = action.payload;
    },
    setFacebookChecked: (state, action) => {
      state.facebookChecked = action.payload;
    },
    setInstaChecked: (state, action) => {
      state.instaChecked = action.payload;
    },
  },
});

export const { setLinkedInChecked,setTwitterChecked,setFacebookChecked,setInstaChecked } = socialSlice.actions;
export default socialSlice.reducer;
