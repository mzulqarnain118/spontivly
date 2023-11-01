// skillsSagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchDataSuccess, fetchDataFailure } from '../skillsSlice';
import * as api from '../apis/skills'
function* fetchSkillsSaga(page) {
  try {
    const response = yield call(api.fetchSkills, page.payload);

    yield put(fetchDataSuccess(response));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export function* watchFetchSkills() {
  yield takeLatest('skills/fetchSkills', fetchSkillsSaga);
}
