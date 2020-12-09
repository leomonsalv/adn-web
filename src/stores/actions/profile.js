import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  email: '',
  name: '',
  dni: '',
  username: '',
  phone: '',
  address: '',
  role: {},
  isLogged: false,
  accessToken: '',
  favorites: [],
  docId: '',
  password: '',
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      const {
        name,
        dni,
        email,
        username,
        phone,
        address,
        role,
        favorites,
        isLogged,
        accessToken,
        id,
        password
      } = action.payload;

      state.email = email;
      state.name = name;
      state.dni = dni;
      state.username = username;
      state.phone = phone;
      state.address = address;
      state.role = role;
      state.isLogged = isLogged;
      state.accessToken = accessToken;
      state.favorites = favorites || [];
      state.docId = id;
      state.password = password;
    },
    cleanProfile: (state) => {
      state.email = '';
      state.name = '';
      state.dni = '';
      state.username = '';
      state.phone = '';
      state.address = '';
      state.role = {};
      state.isLogged = false;
      state.accessToken = '';
      state.favorites = [];
      state.docId = '';
      state.password = '';
    }
  }
});

export const { setProfile, cleanProfile } = ProfileSlice.actions;

export default ProfileSlice.reducer;
