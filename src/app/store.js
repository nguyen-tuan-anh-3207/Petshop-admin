import { useDispatch, useSelector } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import expireReducer from 'redux-persist-expire';

import { rootReducer, middleware } from './rootReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'],
  transforms: [
    expireReducer('auth', {
      // (Optional) Key to be used for the time relative to which store is to be expired
      persistedAtKey: 'login',
      // (Required) Seconds after which store will be expired
      expireSeconds: 60 * 60 * 24,
      // (Optional) State to be used for resetting e.g. provide initial reducer state
      expiredState: {
        token: null,
        user: null,
        stores: [],
        permissions: [],
        isLoading: false,
        isRegister: false,
        error: ''
      },
      // (Optional) Use it if you don't want to manually set the time and want the store to
      // be automatically expired if the record is not updated in the `expireSeconds` time
      autoExpire: true
    })
  ]
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export const createStore = (options) =>
  configureStore({
    reducer: persistedReducer,
    middleware,
    ...options
  });

// epicMiddleware.run(rootEpic)

export const store = createStore();
setupListeners(store.dispatch);

export const useAppDispatch = () => useDispatch();
export const useTypedSelector = useSelector;
