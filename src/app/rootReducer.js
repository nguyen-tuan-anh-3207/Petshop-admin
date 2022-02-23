import { createEpicMiddleware } from 'redux-observable';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import auth from '../reducers/authentication/slice';
import { authApi } from '../reducers/authentication/api';

export const history = createBrowserHistory();

export const epicMiddleware = createEpicMiddleware();

export const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }).concat(routerMiddleware(history), epicMiddleware, authApi.middleware);

export const rootReducer = {
  router: connectRouter(history),
  auth,
  [authApi.reducerPath]: authApi.reducer
};
