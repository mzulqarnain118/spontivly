import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
  name: 'company',
  initialState: {
    companyName: '',
    position: '',
    stage: '',
  },
  reducers: {
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setStage: (state, action) => {
      state.stage = action.payload;
    },
  },
});

export const {
  setCompanyName,
  setPosition,
  setStage,
} = companySlice.actions;
export default companySlice.reducer;