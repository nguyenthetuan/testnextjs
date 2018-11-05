import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/es/storage/session';
import createSagaMiddleWare from 'redux-saga';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import reducers from './reducers';
import rootSaga from './sagas';

const blacklistFilters = createBlacklistFilter('auth', ['message', 'showAuthPopup', 'currentForm', 'popupData']);
const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth', 'constants', 'firstToken'],
  transforms: [blacklistFilters]
};

const configStore = () => {
  const saga = createSagaMiddleWare();
  let middleWares;

  if (process.env.REACT_APP_SERVER_CONFIG !== 'production') {
    const logger = createLogger();
    middleWares = applyMiddleware(saga, logger);
  } else middleWares = applyMiddleware(saga);

  const persistedReducer = persistReducer(persistConfig, reducers);
  const store = createStore(persistedReducer, composeWithDevTools(middleWares));
  const persistor = persistStore(store);

  saga.run(rootSaga);

  return { store, persistor };
};

export default configStore;
