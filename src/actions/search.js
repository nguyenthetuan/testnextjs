/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-03 12:44:51
 */
import { FETCH_SEARCH, FETCH_SEARCH_FAILED, FETCH_SEARCH_SUCCESS } from './types';

export const searchJob = queryString => {
  return {
    type: FETCH_SEARCH,
    payload: { queryString }
  };
};

export const searchJobSuccess = data => {
  return {
    type: FETCH_SEARCH_SUCCESS,
    payload: { ...data }
  };
};

export const searchJobFail = message => {
  return {
    type: FETCH_SEARCH_FAILED,
    payload: { message }
  };
};
