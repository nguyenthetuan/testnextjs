/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-05 21:08:05
 */
import { FETCH_NOTIFCATIONS_FAILED, FETCH_NOTIFCATIONS_SUCCESS, FETCH_NOTIFCATIONS } from '../actions/types';

const initState = {
  data: [],
  message: null,
  loading: false,
  totalEntries: 0,
  totalUnread: 0,
  perPage: 0
};

export default function notificationReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_NOTIFCATIONS:
      return { ...state, loading: true };

    case FETCH_NOTIFCATIONS_SUCCESS:
      return { ...state, ...action.payload, loading: false, message: null };

    case FETCH_NOTIFCATIONS_FAILED:
      return { ...state, loading: false, data: [], message: action.payload.message };

    default:
      return state;
  }
}
