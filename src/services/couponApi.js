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

const checkCoupon = code => {
  let body = {
    code: code
  };
  return _api.POST(`${host}/client/coupons/check_code`, body, _api.addTokenToHeader());
};

export default {
  checkCoupon
};
