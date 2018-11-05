import {
  FETCH_CONSTANTS_SUCCESS,
  FETCH_CONSTANTS_FAILED,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILED
} from '../actions/types';

/*
 * File: reducers/constants.js
 * Desc: defines reducer to handle actions related constants
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-12 11:27:54
 */
const initState = {
  data: {},
  message: null
};

export default function constantsReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_CONSTANTS_SUCCESS:
      return { ...state, ...action.payload };

    case FETCH_CONSTANTS_FAILED:
      return { ...state, data: {}, message: action.payload.message };

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        data: { ...state.data, categories: action.payload.data },
        message: action.payload.message
      };

    case FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        data: { ...state.data, categories: [] },
        message: action.payload.message
      };

    default:
      return state;
  }
}
