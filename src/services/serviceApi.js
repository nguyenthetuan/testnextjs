/*
 * @Author: CuongHx 
 * @Date: 2018-08-21 06:48:28 
 * @Last Modified by: CuongHx
 * @Last Modified time: 2018-08-21 06:48:51
 */

import _api from './_request';
import ApiConfig from '../constants/server-config';

const { API_HOST } = ApiConfig;
const host = API_HOST.replace(/\/$/, '');

const fetctServices = () => {
  return _api.GET(`${host}/client/products`, _api.addTokenToHeader());
};

export default {
  fetctServices
};
