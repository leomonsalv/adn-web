import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  user: undefined,
  login: {
    loading: false,
    errors: undefined
  },
  register: {
    loading: false,
    errors: undefined
  },
  restorePassword: {
    loading: false,
    errors: undefined
  }
};

export const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginAttempt: (state) => {
      state.login.loading = true;
      state.login.errors = undefined;
      state.user = undefined;
    },
    loginSuccess: (state, action) => {
      state.login.loading = false;
      state.login.errors = undefined;
      state.user = action.payload;
    },
    loginFaillure: (state, action) => {
      state.login.loading = false;
      state.login.errors = action.payload;
      state.user = undefined;
    },
    registerAttempt: (state, action) => {
      state.register.loading = true;
      state.register.errors = action.payload;
      state.user = undefined;
    },
    registerSuccess: (state, action) => {
      state.register.loading = false;
      state.register.errors = undefined;
      state.user = action.payload;
    },
    registerFaillure: (state, action) => {
      state.register.loading = false;
      state.register.errors = action.payload;
      state.user = undefined;
    },
  },
  extraReducers: {}
});

export const {
  loginAttempt,
  loginSuccess,
  loginFaillure,
  registerAttempt,
  registerSuccess,
  registerFaillure
} = authSlice.actions;

export default authSlice.reducer;
