import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    currentUser: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchCurrentUser: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.currentUser = action.payload;

      console.log("🚀 ~ file: dashboardSlice.js:17 ~ state.currentUser:", state.currentUser)

      state.loading = false;
    },
    fetchDataFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchCurrentUser, fetchDataSuccess, fetchDataFailure } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
