import { createSlice } from '@reduxjs/toolkit';
import { login } from './api';
import { setCookie } from '../../utils/cookie';
import { AUTH_TOKEN } from '../../constants/string';

const initialState = {
  user: null,
  isLoading: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => ({ ...initialState })
  },
  extraReducers: (builder) => {
    builder.addMatcher(login.matchFulfilled, (state, { payload }) => {
      const { accessToken, user } = payload;
      state.user = user;
      setCookie({
        name: AUTH_TOKEN,
        value: accessToken
      });
    });
  }
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;
