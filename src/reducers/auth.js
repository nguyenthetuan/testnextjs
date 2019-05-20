/*
 * File: reducers/user.js
 * Desc: provides user reducer to process actions what relate to user
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-07-20 00:42:31
 */
import {
  CHANGE_RESUME_SEARCHING_STATUS_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNOUT,
  SHOW_AUTH_POPUP,
  HIDE_AUTH_POPUP,
  UPDATE_LOCATION,
  UPDATE_USER_INFO,
  FETCH_RESUMES_SUCCESS,
  DELETE_RESUME_SUCCESS,
  SHOW_LANGUAGE,
  HIDE_LANGUAGE,
  UPDATE_REDIRECT
} from '../actions/types';

const initState = {
  isLoggedIn: false,
  token: '',
  info: null,
  rememberPassword: false,
  showAuthPopup: false,
  showLanguage: false,
  currentForm: 'login', // login || register || forgot,
  message: null,
  currentLocation: null,
  popupData: null,
  cvList: [],
  redirectPath: null,
};

export default function (state = initState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'persist/REHYDRATE':
      return Object.assign(initState, state);

    case LOGIN_SUCCESS:
      return Object.assign({ isLoggedIn: true }, action.payload);

    case LOGIN_FAILED:
      return { ...state, isLoggedIn: false, message: action.payload.message };

    case UPDATE_USER_INFO:
      return { ...state, info: { ...state.info, ...action.payload.info } };

    case FETCH_RESUMES_SUCCESS:
      return { ...state, cvList: [...action.payload.data] };

    case DELETE_RESUME_SUCCESS:
      return { ...state, cvList: [...state.cvList.slice(0, action.payload.index), ...state.cvList.slice(action.payload.index + 1)] };

    case CHANGE_RESUME_SEARCHING_STATUS_SUCCESS:
      return { ...state, cvList: [...state.cvList.slice(0, payload.index), { ...state.cvList[payload.index], allow_search: payload.status }, ...state.cvList.slice(payload.index + 1)] };
    case SIGNOUT:
      return initState;

    case SHOW_AUTH_POPUP:
      return {
        ...state,
        showAuthPopup: true,
        currentForm: action.payload.form,
        popupData: action.payload.data
      };

    case HIDE_AUTH_POPUP:
      return { ...state, showAuthPopup: false, currentForm: 'login', popupData: null };

    case UPDATE_LOCATION:
      return { ...state, currentLocation: action.payload };

    case UPDATE_REDIRECT:
      return { ...state, redirectPath: action.payload.pathname };

    case SHOW_LANGUAGE:
      return {
        ...state,
        showLanguage: true,
        currentForm: action.payload.form,
        popupData: action.payload.data
      };

    case HIDE_LANGUAGE:
      return { ...state, showLanguage: false, currentForm: 'language', popupData: null };

    default:
      return state;
  }
}
