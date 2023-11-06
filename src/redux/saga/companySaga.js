// companySagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchDataSuccess, fetchDataFailure } from '../companySlice';
import * as api from '../apis/company'
function* fetchCompanyStagesSaga() {
  try {
    const response = yield call(api.fetchCompanyStages);
 

    yield put(fetchDataSuccess(response));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export function* watchFetchCompanyStages() {
  yield takeLatest('company/fetchCompanyStages', fetchCompanyStagesSaga);
}
