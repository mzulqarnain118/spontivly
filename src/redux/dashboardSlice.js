import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    currentUser: [],
  },
  reducers: {
    setCurrentUser: (state, action) => {
            console.log(
              "🚀 ~ file: dashboardSlice.js:13 ~  action.payload:",
              action.payload
            );

      state.currentUser = action.payload;


    },
  },
});

export const { setCurrentUser } = dashboardSlice.actions;
export default dashboardSlice.reducer;
