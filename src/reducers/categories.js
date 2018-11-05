/*
 * File: reducers/constants.js
 * Desc: defines reducer to handle actions related constants
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-12 11:27:54
 */

import { FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILED } from '../actions/types';

const initState = {
  data: [],
  message: null
};

export default function categoriesReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message
      };

    case FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        data: [],
        message: action.payload.message
      };

    default:
      return state;
  }
}
