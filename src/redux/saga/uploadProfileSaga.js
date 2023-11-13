// skillsSagas.js
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchDataSuccess, fetchDataFailure } from "../uploadProfileSlice";
import * as api from "../apis/uploadProfile";
function* uploadProfileSaga(page) {

  console.log("🚀 ~ file: uploadProfileSaga.js:7 ~ function*uploadProfileSaga ~ page:", page)

  
  try {
    const response = yield call(api.uploadProfile, page.payload);

    yield put(fetchDataSuccess(response));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export function* watchUploadProfile() {
  yield takeLatest("photo/setPhotoURL", uploadProfileSaga);
}
