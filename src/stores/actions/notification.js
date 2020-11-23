import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  show: false,
  message: '',
  content: '',
  type: ''
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.content = action.payload.content;
      state.show = true;
    },
    clearNotification: (state) => {
      state.type = '';
      state.message = '';
      state.content = '';
      state.show = false;
    }
  }
});

export const {
  showNotification,
  clearNotification
} = notificationSlice.actions;

export default notificationSlice.reducer;
