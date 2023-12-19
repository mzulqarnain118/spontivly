import { createSlice } from '@reduxjs/toolkit'

const companySlice = createSlice({
  name: 'company',
  initialState: {
    companyInfo: {
      companyName: '',
      position: '',
      stage: null
    }
  },
  reducers: {
    setCompanyInfo: (state, action) => {
      const { companyName, position, stage } = action.payload

      state.companyInfo.companyName = companyName !== undefined ? companyName : state.companyInfo.companyName
      state.companyInfo.position = position !== undefined ? position : state.companyInfo.position
      state.companyInfo.stage = stage !== undefined ? stage : state.companyInfo.stage
    }
  }
})

export const { setCompanyInfo } = companySlice.actions
export const { reducer: CompanySlice } = companySlice
