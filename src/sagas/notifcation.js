/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-05 21:12:18
 */
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { FETCH_NOTIFCATIONS, LOGIN_SUCCESS, MARK_READ_NOTIFICATION, MARK_READ_ALL_NOTIFICATION } from '../actions/types';
import { fetchNotificationsSuccess, fetchNotificationsFail } from '../actions/notification';
import { notificationApi } from '../services';

function* fetchNotificationSaga(action) {
  try {
    let { queryString } = action.payload;
    const response = yield call(notificationApi.fetchNotifications, queryString);
    if (response && response.code === undefined) {
      const { notifications, totalUnread, totalEntries, perPage } = response;
      yield put(fetchNotificationsSuccess({ data: notifications, totalEntries, totalUnread, perPage }));
    } else {
      yield put(fetchNotificationsFail(response.data));
    }
  } catch (error) {
    console.log('Has error with fetchNotificationSaga', error);
    yield put(fetchNotificationsFail(error));
  }
}

function* fetchMoreNotificationSaga(action) {
  try {
    let { queryString } = action.payload;
    const response = yield call(notificationApi.fetchNotifications, queryString);
    if (response && response.code === undefined) {
      const { notifications, totalUnread, totalEntries, perPage } = response;
      yield put(fetchNotificationsSuccess({ data: notifications, totalEntries, totalUnread, perPage }));
    } else {
      // yield put(fetchNotificationsFail(response.data));
    }
  } catch (error) {
    console.log('Has error with fetchNotificationSaga', error);
    // yield put(fetchNotificationsFail(error));
  }
}

function* markReadNotificationsSaga(action) {
  try {
    const { _id } = action.payload.noti;
    const response = yield call(notificationApi.markReadNotifications, { notification: _id });
    if (response && response.code === undefined) {
      let updateListNotification = { ...action.payload.notifications };
      updateListNotification.totalUnread -= 1;
      let { data } = updateListNotification;
      data[action.payload.index].read = true;
      yield put(fetchNotificationsSuccess({ ...updateListNotification }));
    } else {
      // yield put(fetchNotificationsFail(response.data));
    }
  } catch (error) {
    console.log('Has error with mark notification fail...', error);
    // yield put(fetchNotificationsFail(error));
  }
}

function* markReadAllNotificationSaga(action) {
  try {
    const response = yield call(notificationApi.markReadAllNotification);
    if (response && response.code === undefined) {
      let updateListNotification = { ...action.payload.notifications };
      updateListNotification.totalUnread = 0;
      let { data } = updateListNotification;
      data.map(item => {
        item.read = true;
      });
      yield put(fetchNotificationsSuccess({ ...updateListNotification }));
    } else {
      // yield put(fetchNotificationsFail(response.data));
    }
  } catch (error) {
    console.log('Has error with fetchNotificationSaga', error);
    // yield put(fetchNotificationsFail(error));
  }
}

function* watchNotificationsSaga() {
  yield takeLatest(FETCH_NOTIFCATIONS, fetchNotificationSaga);
  yield takeLatest(LOGIN_SUCCESS, fetchNotificationSaga);
  yield takeLatest(MARK_READ_NOTIFICATION, markReadNotificationsSaga);
  yield takeLatest(MARK_READ_ALL_NOTIFICATION, markReadAllNotificationSaga);
}

export default [watchNotificationsSaga];
