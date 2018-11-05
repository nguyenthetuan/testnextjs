/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-23 19:32:02
 */
import _api from './_request';
import ApiConfig from '../constants/server-config';

const { API_HOST } = ApiConfig;
const host = API_HOST.replace(/\/$/, '');

const changePassword = (uid, info) => {
  return _api.PATCH(`${host}/client/users/${uid}`, info, _api.addTokenToHeader());
};

const updateInfo = info => {
  return _api.PATCH(`${host}/client/candidates/update_information`, info, _api.addTokenToHeader());
};

const createResumeByFill = info => {
  return _api.POST(`${host}/candidate/resumes`, info, _api.addTokenToHeader());
};

const createResumeByFile = info => {
  return _api.POST(`${host}/candidate/resumes/create_by_cv`, info, _api.addTokenToHeader());
};

const updateResume = (resumeId, info) => {
  return _api.PATCH(`${host}/candidate/resumes/${resumeId}`, info, _api.addTokenToHeader());
};

const getResumeList = token => {
  return _api.GET(
    `${host}/candidate/resumes/by_user`,
    token
      ? {
        Authorization: `Bearer ${token}`
      }
      : _api.addTokenToHeader()
  );
};

const fetchResumeDetail = id => {
  return _api.GET(`${host}/candidate/resumes/${id}`, _api.addTokenToHeader());
};

const deleteResume = id => {
  return _api.DELETE(`${host}/candidate/resumes/${id}`, {}, _api.addTokenToHeader());
};

const fetchResumeFile = fileURL => {
  return _api.GET(fileURL);
};

const settingNotification = (id, info) => {
  let url = `${host}/candidate/settings/${id}`;

  return _api.PATCH(url, info, _api.addTokenToHeader());
};

export default {
  changePassword,
  updateInfo,
  createResumeByFill,
  createResumeByFile,
  updateResume,
  getResumeList,
  deleteResume,
  fetchResumeDetail,
  fetchResumeFile,
  settingNotification
};
