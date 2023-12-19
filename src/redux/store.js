import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { CompanySlice  } from './companySlice'
import { DashboardSlice  } from './dashboardSlice'
import { InterestsSlice } from './interestsSlice'
import { LocationSlice } from './locationSlice'
import { ObjectiveSlice } from './objectiveSlice'
import { OnBoardingSlice } from './onBoardingSlice'
import { SkillsSlice } from './skillsSlice'
import { SocialSlice } from './socialSlice'

// Combine reducers (exclude OtherReduce)
const rootReducer = combineReducers({
  skills: persistReducer(persistConfig('skills'), SkillsSlice),
  interests: persistReducer(persistConfig('interests'), InterestsSlice),
  location: persistReducer(persistConfig('location'), LocationSlice),
  company: persistReducer(persistConfig('company'), CompanySlice),
  social: persistReducer(persistConfig('social'), SocialSlice),
  objective: persistReducer(persistConfig('objective'), ObjectiveSlice),
  onBoarding: persistReducer(persistConfig('onBoarding'), OnBoardingSlice),
  dashboard: persistReducer(persistConfig('dashboard'), DashboardSlice)
  // OtherReduce is not persisted
  // other: OtherReduce,
  // Add other reducers as needed
})

const store = configureStore({
  reducer: rootReducer
})

export const persistor = persistStore(store) // Export the persistor
export { store }

// Persist configuration for each reducer
function persistConfig(key) {
  return {
    key,
    storage
  }
}
