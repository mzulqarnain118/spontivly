// onBoardingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const onBoardingSlice = createSlice({
  name: "onBoarding",
  initialState: {
    bioText: "", // Store the bio text
    photo: {},
    saveProfile: {
      dashboard_user: null,
      company_name: "",
      position: "",
      introduction: "",
      linkedin_id: "",
      instagram_id: "",
      facebook_id: "",
      twitter_id: "",
      profile_pic: "",
      updated_at: null,
      created_at: null,
      user: null,
      location: null,
      company_stage: null,
      skills: [],
      interests: [],
      objectives: [],
    },
    saveProfileResponse: null,
    error:null
  },
  reducers: {
    setBioText: (state, action) => {
      state.bioText = action.payload;
    },
    setPhotoURL: (state, action) => {
      state.photo = action.payload;
    },
    saveProfile: (state, action) => {
      state.photo = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.error = action.payload;
    },
    fetchDataSuccess: (state, action) => {
      state.saveProfileResponse = action.payload;
    },
  },
});

export const { setBioText,fetchDataFailure,fetchDataSuccess, setPhotoURL } = onBoardingSlice.actions;
export default onBoardingSlice.reducer;
