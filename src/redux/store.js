import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from './skillsSlice';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import interestsReducer from './interestsSlice';

import { watchFetchSkills } from './saga/skillsSagas'; // Import your new saga
import { watchFetchInterests } from './saga/interestsSaga';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    skills: skillsReducer,
    interests: interestsReducer,

    // Add other reducers as needed
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(function* rootSaga() {
  yield all([
    watchFetchSkills(), // Include your new saga here
    watchFetchInterests(), // Include your new saga here
  ]);
});
export default store;