import { createSlice } from '@reduxjs/toolkit'

const socialSlice = createSlice({
  name: 'social',
  initialState: {
    linkedin: {
      id: null
    },
    twitter: {
      id: null
    },
    facebook: {
      id: null
    },
    instagram: {
      id: null
    }
  },
  reducers: {
    setSoicalData: (state, action) => {
      const { provider, id } = action.payload

      state[provider].id = id
    }
  }
})

export const { setSoicalData, setLinkedInChecked, setTwitterChecked, setFacebookChecked, setInstaChecked } = socialSlice.actions
export const { reducer: SocialSlice } = socialSlice
