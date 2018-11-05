/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-05 21:15:44
 */
import _api from './_request';
import ApiConfig from '../constants/server-config';

const { API_HOST } = ApiConfig;
const host = API_HOST.replace(/\/$/, '');

const fetchNotifications = queryString => {
  let url = `${host}/candidate/notifications`;
  if (queryString) {
    url = `${url}?${queryString}`;
  }

  return _api.GET(url, _api.addTokenToHeader());
};

const markReadNotifications = body => {
  let url = `${host}/candidate/notifications/read_notification`;

  return _api.POST(url, body, _api.addTokenToHeader());
};

const markReadAllNotification = () => {
  let url = `${host}/candidate/notifications/read_all_notifications`;

  return _api.POST(url, null, _api.addTokenToHeader());
};

export default {
  fetchNotifications,
  markReadNotifications,
  markReadAllNotification
};
