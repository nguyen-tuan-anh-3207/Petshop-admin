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
      const { token, user } = payload;

      console.log('payload..', payload);
      state.user = user;
      setCookie({
        name: AUTH_TOKEN,
        value: token
      });
    });
  }
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;
