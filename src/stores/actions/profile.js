import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  email: '',
  username: '',
  phone: '',
  address: '',
  role: {},
  isLogged: false,
  accessToken: ''
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      const {
        email,
        username,
        phone,
        address,
        role,
        isLogged,
        accessToken
      } = action.payload;

      state.email = email;
      state.username = username;
      state.phone = phone;
      state.address = address;
      state.role = role;
      state.isLogged = isLogged;
      state.accessToken = accessToken;
    },
    cleanProfile: (state) => {
      state.email = '';
      state.username = '';
      state.phone = '';
      state.address = '';
      state.role = {};
      state.isLogged = false;
      state.accessToken = '';
    }
  }
});

export const { setProfile, cleanProfile } = ProfileSlice.actions;

export default ProfileSlice.reducer;
