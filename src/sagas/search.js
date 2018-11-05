/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-03 12:48:23
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_SEARCH } from '../actions/types';
import { searchJobFail, searchJobSuccess } from '../actions/search';
import { searchApi } from '../services';

function* searchJobSaga(action) {
  try {
    const { queryString } = action.payload;
    const response = yield call(searchApi.fetchData, queryString);
    if (response && response.code === undefined) {
      yield put(searchJobSuccess(response));
    } else {
      yield put(searchJobFail(response.data));
    }
  } catch (error) {
    console.log('Has error with searchJobSaga', error);
    yield put(searchJobFail(error));
  }
}

function* watchSearchJobSaga() {
  yield takeLatest(FETCH_SEARCH, searchJobSaga);
}

export default [watchSearchJobSaga];
