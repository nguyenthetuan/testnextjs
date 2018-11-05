/*
 * File: sagas/auth.js
 * Desc: defines saga function related to authorization actions
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-07-21 11:21:02
 */
import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import {} from '../actions';
import { authApi, userApi } from '../services';
import {
  loginSuccess,
  loginFailed,
  fetchFirstTokenSuccess,
  fetchFirstTokenFailed,
  fetchListResumesSuccess,
  fetchListResumesFail,
  changeResumeSearchingStatusFail,
  changeResumeSearchingStatusSuccess
} from '../actions/auth';
import { LOGIN, FETCH_FIRST_TOKEN, FETCH_FIRST_TOKEN_SUCCESS, LOGIN_SUCCESS, SIGNOUT, FETCH_RESUMES, CHANGE_RESUME_SEARCHING_STATUS } from '../actions/types';
import { saveRememberAuthData, getRememberAuthData, deleteRemberAuthData } from '../utils/localData';

function* loginSaga(action) {
  try {
    const { email, password, rememberPassword } = action.payload;
    const response = yield call(authApi.login, email, password);
    if (response && response.token) {
      const { token, user } = response;
      authApi.setToken(token);
      saveRememberAuthData({ token, info: user, rememberPassword });
      yield put(loginSuccess({ token, info: user, rememberPassword }));
    } else {
      yield put(loginFailed(response));
    }
  } catch (error) {
    console.log('Has error with loginSaga', error);
  }
}

function* fetchFirstTokenSaga() {
  try {
    const response = yield call(authApi.fetchFirstToken);
    if (response && response.token) {
      const getUserToken = state => state.auth.token;
      const userToken = yield select(getUserToken);
      authApi.setToken(userToken || response.token);
      yield put(fetchFirstTokenSuccess(response.token));
    } else {
      yield put(fetchFirstTokenFailed());
    }
  } catch (error) {
    console.log('fetchFirstTokenSaga has new error', error);
  }
}

function* setFirstToken() {
  const getToken = state => ({ firstToken: state.firstToken, auth: state.auth });
  const { firstToken, auth } = yield select(getToken);
  if (!auth.isLoggedIn) yield call(authApi.setToken, firstToken);
}

function* setUserToken() {
  const getUserToken = state => state.auth.token;
  const token = yield select(getUserToken);
  if (token) {
    yield call(authApi.setToken, token);
  }
}

function* rehydrateData(action) {
  const { isLoggedIn, token } = (action.payload && action.payload.auth) || {};
  if (!isLoggedIn) {
    const savedData = getRememberAuthData();
    if (savedData && savedData.info) {
      const response = yield call(userApi.getResumeList, savedData.token);
      if (response && response.resumes) {
        yield put(loginSuccess(savedData));
      }
    }
  } else if (token) {
    yield call(authApi.setToken, token);
  }
}

function* signoutSaga(action) {
  deleteRemberAuthData(action.payload.setDataFlag);
  try {
    const response = yield call(authApi.fetchFirstToken);
    if (response && response.token) {
      yield put(fetchFirstTokenSuccess(response.token));
    } else {
      yield put(fetchFirstTokenFailed());
    }
  } catch (error) {
    console.log('fetchFirstTokenSaga has new error', error);
  }
}

function* fetchListResumesSaga() {
  try {
    const response = yield call(userApi.getResumeList);
    if (response && response.resumes) {
      yield put(fetchListResumesSuccess(response.resumes));
    } else {
      yield put(fetchListResumesFail(response));
    }
  } catch (error) {
    console.log('fetchListResumesSaga has new error', error);
  }
}

function* changeResumeSearchingStatusSaga(action) {
  try {
    const { id, status, index } = action.payload;
    const response = yield call(authApi.changeResumeSearchingStatus, id, status);
    if (response && response.result) {
      yield put(changeResumeSearchingStatusSuccess({ index, status }));
    }
  } catch (error) {
    console.log('changeResumeSearchingStatusSaga has new error', error);
  }
}

function* watchAuthSagas() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeEvery(LOGIN_SUCCESS, setUserToken);
  yield takeLatest(LOGIN_SUCCESS, fetchListResumesSaga);
  yield takeLatest(FETCH_RESUMES, fetchListResumesSaga);
  yield takeEvery('persist/REHYDRATE', rehydrateData);
  yield takeEvery(FETCH_FIRST_TOKEN_SUCCESS, setFirstToken);
  yield takeEvery(SIGNOUT, signoutSaga);
  yield takeLatest(FETCH_FIRST_TOKEN, fetchFirstTokenSaga);
  yield takeLatest(CHANGE_RESUME_SEARCHING_STATUS, changeResumeSearchingStatusSaga);
}

export default [watchAuthSagas];
