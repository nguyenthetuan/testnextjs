/*
 * File: services/constantApi.js
 * Desc: defines function to call API what related to constants
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-12 11:36:33
 */
import _api from './_request';
import ApiConfig from '../constants/server-config';

const { API_HOST } = ApiConfig;
const host = API_HOST.replace(/\/$/, '');

const fetchConstants = () => {
  return _api.GET(`${host}/client/constants`, _api.addTokenToHeader());
};

const fetchCategories = () => {
  return _api.GET(`${host}/client/options/type/category`, _api.addTokenToHeader());
};

const fetchCities = () => {
  return _api.GET(`${host}/client/locations`, _api.addTokenToHeader());
};

export default {
  fetchConstants,
  fetchCategories,
  fetchCities
};
