import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import companyReduce from './companySlice'
import dashboardReducer from './dashboardSlice'
import interestsReducer from './interestsSlice'
import locationReducer from './locationSlice'
import objectiveReducer from './objectiveSlice'
import onBoardingReducer from './onBoardingSlice'
import skillsReducer from './skillsSlice'
import socialReducer from './socialSlice'

// Combine reducers (exclude OtherReduce)
const rootReducer = combineReducers({
  skills: persistReducer(persistConfig('skills'), skillsReducer),
  interests: persistReducer(persistConfig('interests'), interestsReducer),
  location: persistReducer(persistConfig('location'), locationReducer),
  company: persistReducer(persistConfig('company'), companyReduce),
  social: persistReducer(persistConfig('social'), socialReducer),
  objective: persistReducer(persistConfig('objective'), objectiveReducer),
  onBoarding: persistReducer(persistConfig('onBoarding'), onBoardingReducer),
  dashboard: persistReducer(persistConfig('dashboard'), dashboardReducer)
  // OtherReduce is not persisted
  // other: OtherReduce,
  // Add other reducers as needed
})

const store = configureStore({
  reducer: rootReducer
})

export const persistor = persistStore(store) // Export the persistor
export default store

// Persist configuration for each reducer
function persistConfig(key) {
  return {
    key,
    storage
  }
}
