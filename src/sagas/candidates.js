/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-15 17:53:11
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_CANDIDATES,
  FETCH_SAVED_CANDIDATES,
  FETCH_VIEWED_CANDIDATES,
  FETCH_APPLIED_CANDIDATES
} from '../actions/types';
import { candidateApi } from '../services';
import {
  fetchCandidatesSuccess,
  fetchCandidatesFail,
  fetchSavedCandidatesFail,
  fetchSavedCandidatesSuccess,
  fetchViewedCandidatesSuccess,
  fetchViewedCandidatesFail,
  fetchAppliedCandidatesSuccess,
  fetchAppliedCandidatesFail
} from '../actions/candidates';

function* fetchCandidateSaga(actions) {
  try {
    const response = yield call(candidateApi.fetchCandidates, actions.payload.queryString);
    if (response && !response.code && response.resumes) {
      yield put(fetchCandidatesSuccess(response.resumes, response.totalEntries));
    } else {
      yield put(fetchCandidatesFail(response));
    }
  } catch (error) {
    console.log('has error with fetchCandidateSaga', error);
  }
}

function* fetchSavedCandidateSaga(actions) {
  try {
    const response = yield call(candidateApi.fetchSavedCandidates, actions.payload.queryString);
    if (response && !response.code && response.employerSaveProfiles) {
      yield put(fetchSavedCandidatesSuccess(response.employerSaveProfiles, response.totalEntries));
    } else {
      yield put(fetchSavedCandidatesFail(response));
    }
  } catch (error) {
    console.log('has error with fetchSavedCandidateSaga', error);
  }
}

function* fetchViewedCandidateSaga(actions) {
  try {
    const response = yield call(candidateApi.fetchViewedCandidates, actions.payload.queryString);
    if (response && !response.code && response.packageResumes) {
      yield put(fetchViewedCandidatesSuccess(response.packageResumes, response.totalEntries));
    } else {
      yield put(fetchViewedCandidatesFail(response));
    }
  } catch (error) {
    console.log('has error with fetchViewedCandidateSaga', error);
  }
}

function* fetchAppliedCandidateSaga(actions) {
  try {
    const response = yield call(candidateApi.fetchAppliedCandidates, actions.payload.queryString);
    if (response && !response.code && response.job_applications) {
      yield put(fetchAppliedCandidatesSuccess(response.job_applications, response.totalEntries));
    } else {
      yield put(fetchAppliedCandidatesFail(response));
    }
  } catch (error) {
    console.log('has error with fetchAppliedCandidateSaga', error);
  }
}

function* watchCandidateSaga() {
  yield takeLatest(FETCH_CANDIDATES, fetchCandidateSaga);
  yield takeLatest(FETCH_SAVED_CANDIDATES, fetchSavedCandidateSaga);
  yield takeLatest(FETCH_VIEWED_CANDIDATES, fetchViewedCandidateSaga);
  yield takeLatest(FETCH_APPLIED_CANDIDATES, fetchAppliedCandidateSaga);
}

export default [watchCandidateSaga];
