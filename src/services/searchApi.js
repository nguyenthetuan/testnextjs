/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-03 12:38:45
 */
import _api from './_request';
import ApiConfig from '../constants/server-config';

const { API_HOST } = ApiConfig;
const host = API_HOST.replace(/\/$/, '');

const fetchData = queryString => {
  let url = `${host}/client/searchs`;
  if (queryString) {
    url = `${url}?${queryString}`;
  }
  return _api.GET(url, _api.addTokenToHeader());
};

export default {
  fetchData
};
