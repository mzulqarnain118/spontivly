import { createSlice } from '@reduxjs/toolkit';

const socialSlice = createSlice({
  name: "social",
  initialState: {
    linkedin: {
      id: null,
    },
    twitter: {
      id: null,
    },
    facebook: {
      id: null,
    },
    instagram: {
      id: null,
    },
  },
  reducers: {
    setSoicalData: (state, action) => {
      const { provider, id } = action.payload;

      console.log("🚀 ~ file: socialSlice.js:35 ~ provider, id:", provider, id)

      state[provider].id = id;

      console.log("🚀 ~ file: socialSlice.js:36 ~ state:", state)

    },
  },
});

export const {setSoicalData, setLinkedInChecked,setTwitterChecked,setFacebookChecked,setInstaChecked } = socialSlice.actions;
export default socialSlice.reducer;
