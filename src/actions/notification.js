/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-05 21:04:57
 */
import { FETCH_NOTIFCATIONS, FETCH_NOTIFCATIONS_FAILED, FETCH_NOTIFCATIONS_SUCCESS, MARK_READ_NOTIFICATION, MARK_READ_ALL_NOTIFICATION } from './types';

export const fetchNotifications = queryString => {
  return {
    type: FETCH_NOTIFCATIONS,
    payload: { queryString }
  };
};

export const fetchNotificationsSuccess = payload => {
  return {
    type: FETCH_NOTIFCATIONS_SUCCESS,
    payload
  };
};

export const fetchNotificationsFail = message => {
  return {
    type: FETCH_NOTIFCATIONS_FAILED,
    payload: { message }
  };
};

export const markReadNotifications = (noti, index, allNoti) => {
  return {
    type: MARK_READ_NOTIFICATION,
    payload: { noti: noti, index: index, notifications: allNoti }
  };
};

export const markReadAllNotification = allNoti => {
  return {
    type: MARK_READ_ALL_NOTIFICATION,
    payload: { notifications: allNoti }
  };
};
