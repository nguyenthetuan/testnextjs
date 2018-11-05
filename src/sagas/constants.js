/*
 * File: sagas/constants.js
 * Desc: defines saga functions to handle action related constants API
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-12 11:31:59
 */
import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  FETCH_CONSTANTS,
  LOGIN_SUCCESS,
  FETCH_CATEGORIES,
  FETCH_CITIES,
  FETCH_FIRST_TOKEN_SUCCESS
} from '../actions/types';
import { constantApi } from '../services';
import {
  fetchConstantsSuccess,
  fetchConstantsFail,
  fetchCategoriesFail,
  fetchCategoriesSuccess,
  fetchCitiesSuccess,
  fetchCitiesFail
} from '../actions/constants';

function* fetchConstantSaga() {
  try {
    const response = yield call(constantApi.fetchConstants);
    if (response && !response.code) {
      yield put(fetchConstantsSuccess(response));
    } else {
      yield put(fetchConstantsFail(response));
    }
  } catch (error) {
    console.log('Has an error with fetchConstantSaga', error);
  }
}

function* fetchCategorySaga() {
  try {
    const response = yield call(constantApi.fetchCategories);
    if (response && !response.code && response.options) {
      yield put(fetchCategoriesSuccess(response.options));
    } else {
      yield put(fetchCategoriesFail(response));
    }
  } catch (error) {
    console.log('Has an error with fetchCategorySaga', error);
  }
}

function* fetchCitiesSaga() {
  try {
    const response = yield call(constantApi.fetchCities);
    if (response && !response.code && response.locations) {
      yield put(fetchCitiesSuccess(response.locations));
    } else {
      yield put(fetchCitiesFail(response));
    }
  } catch (error) {
    console.log('Has an error with fetchCitiesSaga', error);
  }
}

function* watchConstantSaga() {
  yield takeLatest(FETCH_CONSTANTS, fetchConstantSaga);
  yield takeLatest(FETCH_FIRST_TOKEN_SUCCESS, fetchConstantSaga);
  yield takeLatest(FETCH_CATEGORIES, fetchCategorySaga);
  yield takeLatest(LOGIN_SUCCESS, fetchCategorySaga);
  yield takeLatest(FETCH_CITIES, fetchCitiesSaga);
  yield takeLatest(FETCH_FIRST_TOKEN_SUCCESS, fetchCitiesSaga);
  yield takeLatest(FETCH_FIRST_TOKEN_SUCCESS, fetchCategorySaga);
}

export default [watchConstantSaga];
