import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyInfo: {
      companyName: "",
      position: "",
      stage: null,
    },
    stages:[],
    loading:false,
    error:null
  },
  reducers: {
    setCompanyInfo: (state, action) => {
      
      const { companyName, position, stage } = action.payload;
      state.companyInfo.companyName =
        companyName !== undefined ? companyName : state.companyInfo.companyName;
      state.companyInfo.position =
        position !== undefined ? position : state.companyInfo.position;
      state.companyInfo.stage =
        stage !== undefined ? stage : state.companyInfo.stage;
    },
    fetchCompanyStages: (state) => {
      state.loading = true
    },
    fetchDataSuccess: (state, action) => {
      state.stages = action.payload.response.results
      state.loading = false
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCompanyInfo ,fetchDataSuccess , fetchDataFailure,fetchCompanyStages} = companySlice.actions;
export default companySlice.reducer;
