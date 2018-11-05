/*
 * File: actions/candidates.js
 * Desc: defines actions ralated to candidate pages
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-15 17:42:31
 */
import {
  FETCH_CANDIDATES,
  FETCH_CANDIDATES_FAILED,
  FETCH_CANDIDATES_SUCCESS,
  FETCH_CANDIDATE_INFO,
  FETCH_CANDIDATE_INFO_SUCCESS,
  FETCH_CANDIDATE_INFO_FAILED,
  FETCH_SAVED_CANDIDATES,
  FETCH_SAVED_CANDIDATES_SUCCESS,
  FETCH_SAVED_CANDIDATES_FAILED,
  FETCH_VIEWED_CANDIDATES,
  FETCH_VIEWED_CANDIDATES_SUCCESS,
  FETCH_VIEWED_CANDIDATES_FAILED,
  FETCH_APPLIED_CANDIDATES_SUCCESS,
  FETCH_APPLIED_CANDIDATES,
  FETCH_APPLIED_CANDIDATES_FAILED
} from './types';

export const fetchCandidates = queryString => {
  return {
    type: FETCH_CANDIDATES,
    payload: { queryString }
  };
};

export const fetchCandidatesSuccess = (data, totalEntries) => {
  return {
    type: FETCH_CANDIDATES_SUCCESS,
    payload: { data, totalEntries, message: { code: 0 } }
  };
};

export const fetchCandidatesFail = message => {
  return {
    type: FETCH_CANDIDATES_FAILED,
    payload: { data: [], totalEntries: 0, message }
  };
};

export const fetchSavedCandidates = queryString => {
  return {
    type: FETCH_SAVED_CANDIDATES,
    payload: { queryString }
  };
};

export const fetchSavedCandidatesSuccess = (data, totalEntries) => {
  return {
    type: FETCH_SAVED_CANDIDATES_SUCCESS,
    payload: { data, totalEntries, message: { code: 0 } }
  };
};

export const fetchSavedCandidatesFail = message => {
  return {
    type: FETCH_SAVED_CANDIDATES_FAILED,
    payload: { data: [], totalEntries: 0, message }
  };
};

export const fetchViewedCandidates = queryString => {
  return {
    type: FETCH_VIEWED_CANDIDATES,
    payload: { queryString }
  };
};

export const fetchViewedCandidatesSuccess = (data, totalEntries) => {
  return {
    type: FETCH_VIEWED_CANDIDATES_SUCCESS,
    payload: { data, totalEntries, message: { code: 0 } }
  };
};

export const fetchViewedCandidatesFail = message => {
  return {
    type: FETCH_VIEWED_CANDIDATES_FAILED,
    payload: { data: [], totalEntries: 0, message }
  };
};

export const fetchAppliedCandidates = queryString => {
  return {
    type: FETCH_APPLIED_CANDIDATES,
    payload: { queryString }
  };
};

export const fetchAppliedCandidatesSuccess = (data, totalEntries) => {
  return {
    type: FETCH_APPLIED_CANDIDATES_SUCCESS,
    payload: { data, totalEntries, message: { code: 0 } }
  };
};

export const fetchAppliedCandidatesFail = message => {
  return {
    type: FETCH_APPLIED_CANDIDATES_FAILED,
    payload: { data: [], totalEntries: 0, message }
  };
};

export const fetchCandidateInfo = candidateID => {
  return {
    type: FETCH_CANDIDATE_INFO,
    payload: { candidateID }
  };
};

export const fetchCandidateInfoSuccess = info => {
  return {
    type: FETCH_CANDIDATE_INFO_SUCCESS,
    payload: { info, message: { code: 0 } }
  };
};

export const fetchCandidateInfoFail = message => {
  return {
    type: FETCH_CANDIDATE_INFO_FAILED,
    payload: { info: null, message }
  };
};
