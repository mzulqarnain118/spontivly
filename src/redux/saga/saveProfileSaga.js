// skillsSagas.js
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchDataSuccess, fetchDataFailure } from "../onBoardingSlice";
import * as api from "../apis/saveProfile";
function* saveProfileSaga(page) {
  console.log(
    "🚀 ~ file: saveProfileSaga.js:7 ~ function*saveProfileSaga ~ page:",
    page
  );

  try {
    const response = yield call(api.saveProfile, page.payload);

    yield put(fetchDataSuccess(response));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export function* watchSaveProfile() {
  yield takeLatest("onBoarding/handleNext", saveProfileSaga);
}
