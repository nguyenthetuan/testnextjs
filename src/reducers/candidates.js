/*
 * File: reducers/candidates.js
 * Desc: define reducer for candidates page
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-15 17:24:35
 */
import {
  FETCH_CANDIDATES_SUCCESS,
  FETCH_CANDIDATES_FAILED,
  FETCH_SAVED_CANDIDATES_SUCCESS,
  FETCH_SAVED_CANDIDATES_FAILED,
  FETCH_VIEWED_CANDIDATES_SUCCESS,
  FETCH_VIEWED_CANDIDATES_FAILED,
  FETCH_APPLIED_CANDIDATES_SUCCESS,
  FETCH_APPLIED_CANDIDATES_FAILED
} from '../actions/types';

const initState = {
  data: [],
  totalEntries: 0,
  message: null
};

export default function candidatesReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_CANDIDATES_SUCCESS:
    case FETCH_SAVED_CANDIDATES_SUCCESS:
    case FETCH_VIEWED_CANDIDATES_SUCCESS:
    case FETCH_APPLIED_CANDIDATES_SUCCESS:
      return { ...state, ...action.payload };

    case FETCH_CANDIDATES_FAILED:
    case FETCH_SAVED_CANDIDATES_FAILED:
    case FETCH_VIEWED_CANDIDATES_FAILED:
    case FETCH_APPLIED_CANDIDATES_FAILED:
      return { ...state, ...action.payload, data: [] };

    default:
      return state;
  }
}
