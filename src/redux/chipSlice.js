import { createSlice } from '@reduxjs/toolkit'

const chipSlice = (name) =>
  createSlice({
    name,
    initialState: {
      selectedChips: [],
      searchText: '',
      chipData: [],
      filterChipData: []
    },
    reducers: {
      addSelectedChip: (state, action) => {
        state.selectedChips.push(action.payload)
        state.filterChipData = state.filterChipData.filter((chip) => chip.id !== action.payload.id)
      },
      setSearchText: (state, action) => {
        state.searchText = action.payload
        state.filterChipData = state.chipData
          .filter((chip) => chip.name.toLowerCase().includes(action.payload.toLowerCase()))
          .filter((chip) => {
            return state.selectedChips.every((selectedChip) => selectedChip.name !== chip.name)
          })
      },
      removeSelectedChip: (state, action) => {
        state.selectedChips = state.selectedChips.filter((chip) => chip.id !== action.payload.id)
        state.chipData.push(action.payload)
        state.filterChipData.push(action.payload)
      },
      setChipData: (state, action) => {
        state.chipData = action.payload
        state.filterChipData = state?.chipData
          ?.filter((chip) => chip?.name.toLowerCase().includes(state.searchText?.toLowerCase()))
          .filter((chip) => {
            return state.selectedChips.every((selectedChip) => selectedChip.name !== chip.name)
          })
      }
    }
  })

export default chipSlice
