// onBoardingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const onBoardingSlice = createSlice({
  name: "onBoarding",
  initialState: {
    bioText: "", // Store the bio text
    profilePic: null,
    profilePicPayload: null,
    photoFlag: false,
    saveProfileResponse: null,
    error: null,
    loading: null,
  },
  reducers: {
    setBioText: (state, action) => {
      state.bioText = action.payload;
    },
    setPhotoURL: (state, action) => {
      const { profilePic, profilePicPayload } = action.payload;
      state.profilePicPayload = profilePicPayload;
      state.profilePic = profilePic;
      state.photoFlag = true;
    },
    fetchDataFailure: (state, action) => {
      state.error = action.payload;
    },
    fetchDataSuccess: (state, action) => {
      state.saveProfileResponse = action.payload;
    },
  },
});

export const { setBioText, fetchDataFailure, fetchDataSuccess, setPhotoURL, saveProfile } = onBoardingSlice.actions;
export default onBoardingSlice.reducer;
