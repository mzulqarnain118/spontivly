import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    currentUser: [],
    loading:false,
    error: null,
  },
  reducers: {
    fetchCurrentUser: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {

      console.log("🚀 ~ file: dashboardSlics.js:16 ~ action:", action)
      state.currentUser = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchCurrentUser,
  fetchDataSuccess,
  fetchDataFailure,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
