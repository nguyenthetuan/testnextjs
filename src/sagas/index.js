/*
 * File: sagas/index
 * Desc: return list sagas what will be used for actions
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-07-18 20:31:48
 */
import { call, all } from 'redux-saga/effects';
import auth from './auth';
import constants from './constants';
import candidates from './candidates';
import search from './search';
import notification from './notifcation';

const sagas = [...auth, ...constants, ...candidates, ...search, ...notification];

export default function* rootSaga() {
  yield all(sagas.map(saga => call(saga)));
}
