import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  spinner: false
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    loadingWithSpinner: (state) => {
      state.loading = true;
      state.spinner = true;
    },
    loaded: (state) => {
      state.loading = false;
      state.spinner = false;
    }
  }
});

export const { loading, loadingWithSpinner, loaded } = loaderSlice.actions;

export default loaderSlice.reducer;
