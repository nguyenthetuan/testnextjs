/*
 * File: actions/auth.js
 * Desc: defines actions related to login
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-07-21 11:07:49
 */
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNOUT,
  FETCH_FIRST_TOKEN,
  FETCH_FIRST_TOKEN_FAILED,
  FETCH_FIRST_TOKEN_SUCCESS,
  SHOW_AUTH_POPUP,
  HIDE_AUTH_POPUP,
  UPDATE_LOCATION,
  UPDATE_USER_INFO,
  FETCH_RESUMES,
  FETCH_RESUMES_SUCCESS,
  FETCH_RESUMES_FAILED,
  DELETE_RESUME_SUCCESS,
  CHANGE_RESUME_SEARCHING_STATUS,
  CHANGE_RESUME_SEARCHING_STATUS_FAILED,
  CHANGE_RESUME_SEARCHING_STATUS_SUCCESS
} from './types';

export const login = (email, password, rememberPassword) => {
  return {
    type: LOGIN,
    payload: { email, password, rememberPassword }
  };
};

export const loginSuccess = userInfo => {
  return {
    type: LOGIN_SUCCESS,
    payload: userInfo
  };
};

export const loginFailed = message => {
  return {
    type: LOGIN_FAILED,
    payload: { message }
  };
};

export const signOut = (setDataFlag = true) => {
  return {
    type: SIGNOUT,
    payload: { setDataFlag }
  };
};

export const fetchFirstToken = () => {
  return {
    type: FETCH_FIRST_TOKEN
  };
};

export const fetchFirstTokenSuccess = token => {
  return {
    type: FETCH_FIRST_TOKEN_SUCCESS,
    payload: token
  };
};

export const fetchFirstTokenFailed = () => {
  return {
    type: FETCH_FIRST_TOKEN_FAILED
  };
};

export const showAuthPopup = (form = 'login', data = null) => {
  return {
    type: SHOW_AUTH_POPUP,
    payload: { form, data }
  };
};

export const hideAuthPopup = () => {
  return {
    type: HIDE_AUTH_POPUP
  };
};

export const updateLocation = location => {
  return {
    type: UPDATE_LOCATION,
    payload: location
  };
};

export const updateUserInfo = info => {
  return {
    type: UPDATE_USER_INFO,
    payload: { info }
  };
};

export const fetchListResumes = () => {
  return {
    type: FETCH_RESUMES
  };
};

export const fetchListResumesSuccess = data => {
  return {
    type: FETCH_RESUMES_SUCCESS,
    payload: { data }
  };
};

export const fetchListResumesFail = message => {
  return {
    type: FETCH_RESUMES_FAILED,
    payload: { message, data: [] }
  };
};

export const deleteResumeSuccess = index => {
  return {
    type: DELETE_RESUME_SUCCESS,
    payload: { index }
  };
};

export const changeResumeSearchingStatus = info => {
  return {
    type: CHANGE_RESUME_SEARCHING_STATUS,
    payload: { ...info }
  };
};

export const changeResumeSearchingStatusSuccess = info => {
  return {
    type: CHANGE_RESUME_SEARCHING_STATUS_SUCCESS,
    payload: { ...info }
  };
};

export const changeResumeSearchingStatusFail = () => {
  return {
    type: CHANGE_RESUME_SEARCHING_STATUS_FAILED
  };
};
