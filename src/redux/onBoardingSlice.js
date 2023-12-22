// onBoardingSlice.js
import { createSlice } from '@reduxjs/toolkit'

const onBoardingSlice = createSlice({
  name: 'onBoarding',
  initialState: {
    bioText: '', // Store the bio text
    profilePic: null,
    profilePicPayload: null,
    photoFlag: false,
    activeStep: 0,
    saveProfileResponse: null,
    error: null,
    loading: null
  },
  reducers: {
    setBioText: (state, action) => {
      state.bioText = action.payload
    },
    setPhotoURL: (state, action) => {
      const { profilePic, profilePicPayload } = action.payload

      state.profilePicPayload = profilePicPayload
      state.profilePic = profilePic
      state.photoFlag = true
    },
    fetchDataFailure: (state, action) => {
      state.error = action.payload
    },
    fetchDataSuccess: (state, action) => {
      state.saveProfileResponse = action.payload
    },
    handleNext: (state) => {
      state.activeStep += 1
    },
    handleBack: (state) => {
      state.activeStep -= 1
    },
    resetStepper: (state) => {
      state.activeStep = 0
    }
  }
})

export const { setBioText, activeStep, fetchDataFailure, fetchDataSuccess, handleNext, resetStepper, handleBack, setPhotoURL, saveProfile } =
  onBoardingSlice.actions
export const { reducer: OnBoardingSlice } = onBoardingSlice
