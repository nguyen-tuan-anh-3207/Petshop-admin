import { createEpicMiddleware } from 'redux-observable';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import auth from '../reducers/authentication/slice';
import { authApi } from '../reducers/authentication/api';
import { productApi } from '../reducers/product/api';
import { categoryApi } from '../reducers/category/api';
import { blogApi } from '../reducers/blog/api';
import { userApi } from '../reducers/user/api';
import { orderApi } from '../reducers/order/api';

export const history = createBrowserHistory();

export const epicMiddleware = createEpicMiddleware();

export const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }).concat(
    routerMiddleware(history),
    epicMiddleware,
    authApi.middleware,
    productApi.middleware,
    categoryApi.middleware,
    blogApi.middleware,
    userApi.middleware,
    orderApi.middleware
  );

export const rootReducer = {
  router: connectRouter(history),
  auth,
  [authApi.reducerPath]: authApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [blogApi.reducerPath]: blogApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer
};
