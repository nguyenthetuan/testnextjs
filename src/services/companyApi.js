/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-22 01:49:59
 */
import _api from './_request';
import ApiConfig from '../constants/server-config';

const { API_HOST } = ApiConfig;
const host = API_HOST.replace(/\/$/, '');

const fetchCompanyInfo = () => {
  return _api.GET(`${host}/client/companies/by_user`, _api.addTokenToHeader());
};

const updateCompanyInfo = (id, info) => {
  return _api.PATCH(`${host}/client/companies/${id}`, info, _api.addTokenToHeader());
};

export default {
  fetchCompanyInfo,
  updateCompanyInfo
};
