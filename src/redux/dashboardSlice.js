import { createSlice } from '@reduxjs/toolkit'

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    currentUser: [],
    isModerator: false,
    userId: null
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload?.[0]
      const role = action.payload?.[0]?.user?.groups?.[0]?.name ?? ''

      state.userId = action.payload?.[0]?.user?.id ?? null

      state.isModerator = role === 'Moderator'
    }
  }
})

export const { setCurrentUser } = dashboardSlice.actions
export const { reducer: DashboardSlice } = dashboardSlice
