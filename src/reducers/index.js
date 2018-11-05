/*
 * File: reducers/index.js
 * Desc: return list reducers
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-07-18 20:45:32
 */
import { combineReducers } from 'redux';
import { FETCH_FIRST_TOKEN_SUCCESS, FETCH_FIRST_TOKEN_FAILED } from '../actions/types';

import auth from './auth';
import constants from './constants';
import categories from './categories';
import locations from './locations';
import candidates from './candidates';
import search from './search';
import notifications from './notification';

const firstToken = (state = '', action) => {
  switch (action.type) {
    case FETCH_FIRST_TOKEN_SUCCESS:
      return action.payload;

    case FETCH_FIRST_TOKEN_FAILED:
      return false;

    default:
      return state;
  }
};

export default combineReducers({
  firstToken,
  auth,
  constants,
  categories,
  locations,
  candidates,
  search,
  notifications
});
