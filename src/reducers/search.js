/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-03 12:55:21
 */
import { FETCH_SEARCH_FAILED, FETCH_SEARCH_SUCCESS, FETCH_SEARCH } from '../actions/types';

const initState = {
  jobs: null,
  loading: false,
  message: null
};

export default function searchReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_SEARCH:
      return { ...state, loading: true };

    case FETCH_SEARCH_SUCCESS:
      return { ...state, ...action.payload, loading: false, message: null };

    case FETCH_SEARCH_FAILED:
      return { ...state, jobs: [], message: action.payload.message, loading: false };

    default:
      return state;
  }
}
