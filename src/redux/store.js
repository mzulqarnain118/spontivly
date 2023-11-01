import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from './skillsSlice';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import interestsReducer from './interestsSlice';
import locationReducer from './locationSlice';
import companyReduce from './companySlice';
import objectiveReducer from './objectiveSlice';
import bioReducer from './bioSlice';
import photoReducer from './photoSlice';
import { watchFetchSkills } from './saga/skillsSagas'; // Import your new saga
import { watchFetchInterests } from './saga/interestsSaga';
import { watchFetchObjectives } from './saga/objectivesSaga';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    skills: skillsReducer,
    interests: interestsReducer,
    location: locationReducer,
    company: companyReduce,
    objective: objectiveReducer,
    bio: bioReducer,
    photo: photoReducer
    // Add other reducers as needed
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(function* rootSaga() {
  yield all([
    watchFetchSkills(), // Include your new saga here
    watchFetchInterests(),
    watchFetchObjectives() // Include your new saga here
  ]);
});
export default store;