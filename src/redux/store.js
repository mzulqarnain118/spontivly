import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from './skillsSlice';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import interestsReducer from './interestsSlice';
import locationReducer from './locationSlice';
import companyReduce from './companySlice';
import socialReducer from "./socialSlice";
import objectiveReducer from './objectiveSlice';
import onBoardingReducer from './onBoardingSlice';
import { watchFetchSkills } from './saga/skillsSagas'; // Import your new saga
import { watchFetchInterests } from './saga/interestsSaga';
import { watchFetchObjectives } from './saga/objectivesSaga';
import { watchLocationText } from './saga/locationSaga';
import { watchFetchCompanyStages } from './saga/companySaga';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    skills: skillsReducer,
    interests: interestsReducer,
    location: locationReducer,
    company: companyReduce,
    social:socialReducer,
    objective: objectiveReducer,
    onBoarding: onBoardingReducer,
    // Add other reducers as needed
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(function* rootSaga() {
  yield all([
    watchFetchSkills(), // Include your new saga here
    watchFetchInterests(),
    watchFetchObjectives(),
    watchLocationText(),
    watchFetchCompanyStages(),
  ]);
});
export default store;