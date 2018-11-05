/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-18 09:24:41
 */
import _api from './_request';
import ApiConfig from '../constants/server-config';

const { API_HOST } = ApiConfig;
const host = API_HOST.replace(/\/$/, '');

const fetchResumeDetail = id => {
  return _api.GET(`${host}/candidate/resumes/${id}`, _api.addTokenToHeader());
};

const deteleResume = id => {
  return _api.DELETE(`${host}/candidate/resumes/${id}`, {}, _api.addTokenToHeader());
};

export default { fetchResumeDetail, deteleResume };
