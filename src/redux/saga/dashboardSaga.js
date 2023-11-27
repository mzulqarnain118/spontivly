// skillsSagas.js
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchDataSuccess, fetchDataFailure } from "../dashboardSlice";
import * as api from "../apis/dashboard";
function* fetchCurrentUserSaga() {
  try {
    const response = yield call(api.fetchCurrentUser);
    yield put(fetchDataSuccess(response));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export function* watchFetchCurrentUser() {
  yield takeLatest("dashboard/fetchCurrentUser", fetchCurrentUserSaga);
}
