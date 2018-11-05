/*
 * @Author: CuongHx 
 * @Date: 2018-07-13 11:41:27 
 * @Last Modified by: 
 * @Last Modified time: 2018-09-01 17:13:55
 */

// 000: Success
// 400: Show message
// 500: Internet Server Error

import _api from './_request';
import ApiConfig from '../constants/server-config';

const { API_HOST, APP_VERSION, SECRETE_KEY } = ApiConfig;
const host = API_HOST.replace(/\/$/, '');

const fetchFirstToken = () => {
  const url = `${host}/token`;
  return _api.GET(url, {
    'app-version': APP_VERSION,
    'secret-key': SECRETE_KEY
  });
};

const setToken = token => {
  _api.setToken(token);
};

const login = (email, password) => {
  const url = `${host}/auth/login`;
  return _api.POST(url, { email, password }, Object.assign({ 'Content-Type': 'multipart/form-data' }, _api.addTokenToHeader()));
};

const getSMSCode = phone => {
  return _api.POST(`${host}/client/sms/verify/start`, { phone: phone.replace(/^(\+84|0)/, '84') }, Object.assign({ 'Content-Type': 'multipart/form-data' }, _api.addTokenToHeader()));
};

const verifyCode = (phone, pin) => {
  return _api.POST(`${host}/client/sms/verify/check`, { phone: phone.replace(/^(\+84|0)/, '84'), pin }, Object.assign({ 'Content-Type': 'multipart/form-data' }, _api.addTokenToHeader()));
};

const register = info => {
  return _api.POST(`${host}/client/candidates/sign_up`, info, Object.assign({ 'Content-Type': 'multipart/form-data' }, _api.addTokenToHeader()));
};

const verifyPhoneEmail = keyword => {
  return _api.POST(`${host}/client/users/checkUniqueEmail`, { keyword }, _api.addTokenToHeader());
};

const sendForgotPasswordEmail = email => {
  return _api.POST(`${host}/client/users/forgot_password`, { email }, _api.addTokenToHeader());
};

const checkResetPwdToken = info => {
  return _api.POST(`${host}/client/users/check_reset_token`, info, _api.addTokenToHeader());
};

const updatePassword = data => {
  return _api.POST(`${host}/client/users/password/new`, data, _api.addTokenToHeader());
};

const socialLogin = (network, access_token) => {
  return _api.POST(`${host}/client/users/oauth/${network}`, { access_token }, _api.addTokenToHeader());
};

const changeResumeSearchingStatus = (id, allow_search) => {
  return _api.POST(`${host}/candidate/resumes/allow_search/${id}`, { allow_search }, _api.addTokenToHeader());
};

const refreshResume = id => {
  return _api.POST(`${host}/candidate/resumes/refresh/${id}`, {}, _api.addTokenToHeader());
};

export default {
  fetchFirstToken,
  setToken,
  login,
  getSMSCode,
  verifyCode,
  register,
  sendForgotPasswordEmail,
  checkResetPwdToken,
  updatePassword,
  verifyPhoneEmail,
  socialLogin,
  refreshResume,
  changeResumeSearchingStatus
};
