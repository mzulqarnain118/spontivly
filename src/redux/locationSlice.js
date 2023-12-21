import { createSlice } from '@reduxjs/toolkit'

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    searchText: '',
    selectedLocation: null
  },
  reducers: {
    setLocationText: (state, action) => {
      state.searchText = action.payload
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload
    }
  }
})

export const { setLocationText, setSelectedLocation } = locationSlice.actions
export const { reducer: LocationSlice } = locationSlice
