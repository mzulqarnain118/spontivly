// skillsSagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchDataSuccess, fetchDataFailure } from '../interestsSlice';
import * as api from '../apis/interests'
function* fetchInterestsSaga(page) {
  try {
    const response = yield call(api.fetchInterests, page.payload);
 

    yield put(fetchDataSuccess(response));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export function* watchFetchInterests() {
  yield takeLatest('interests/fetchInterests', fetchInterestsSaga);
}
