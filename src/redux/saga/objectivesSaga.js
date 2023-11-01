// skillsSagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchDataSuccess, fetchDataFailure } from '../objectiveSlice';
import * as api from '../apis/objectives'
function* fetchObjectivesSaga(page) {
  try {
    const response = yield call(api.fetchObjectives, page.payload);
 

    yield put(fetchDataSuccess(response));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export function* watchFetchObjectives() {
  yield takeLatest('objective/fetchObjectives', fetchObjectivesSaga);
}
