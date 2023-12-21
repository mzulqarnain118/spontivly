import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { CompanySlice } from './companySlice'
import { DashboardSlice } from './dashboardSlice'
import { InterestsSlice } from './interestsSlice'
import { LocationSlice } from './locationSlice'
import { ObjectiveSlice } from './objectiveSlice'
import { OnBoardingSlice } from './onBoardingSlice'
import { SkillsSlice } from './skillsSlice'
import { SocialSlice } from './socialSlice'

// Combine reducers (exclude OtherReduce)
const rootReducer = combineReducers({
  skills: SkillsSlice,
  interests: InterestsSlice,
  location: LocationSlice,
  company: CompanySlice,
  social: SocialSlice,
  objective: ObjectiveSlice,
  onBoarding: OnBoardingSlice,
  dashboard: DashboardSlice
  // OtherReduce is not persisted
  // other: OtherReduce,
  // Add other reducers as needed
})

const store = configureStore({
  reducer: rootReducer
})

export { store }
