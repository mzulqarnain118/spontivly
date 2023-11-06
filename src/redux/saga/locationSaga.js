// skillsSagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchDataSuccess, fetchDataFailure } from '../locationSlice';
import * as api from '../apis/location'
function* fetchLocationSaga(page) {
  try {
    const response = yield call(api.fetchLocation, page.payload);
 

    yield put(fetchDataSuccess(response));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export function* watchLocationText() {
  yield takeLatest('location/setLocationText', fetchLocationSaga);
}
