/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-14 15:01:40
 */
import { FETCH_CITIES_SUCCESS, FETCH_CITIES_FAILED } from '../actions/types';

const initState = {
  city: [],
  districts: [],
  message: null
};
export default function locationsReducers(state = initState, action) {
  switch (action.type) {
    case FETCH_CITIES_SUCCESS:
      return { ...state, cities: action.payload.data, message: action.payload.message };

    case FETCH_CITIES_FAILED:
      return { ...state, cities: [], message: action.payload.message };

    default:
      return state;
  }
}
