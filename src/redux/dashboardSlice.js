import { createSlice } from '@reduxjs/toolkit'

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    currentUser: []
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload?.[0]
    }
  }
})

export const { setCurrentUser } = dashboardSlice.actions
export const { reducer: DashboardSlice } = dashboardSlice
