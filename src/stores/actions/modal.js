/* eslint-disable no-param-reassign  */

import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false,
    content: undefined,
    buttons: [],
    showOkButton: false,
  },
  reducers: {
    setButtons: (state, action) => {
      state.buttons = action.payload.buttons;
    },
    setContent: (state, action) => {
      state.content = action.payload.content;
    },
    openModal: (state, action) => {
      state.content = action.payload.content;
      state.buttons = action.payload.buttons;
      state.open = true;
      state.showOkButton = action.payload.showOkButton;
    },
    closeModal: (state) => {
      state.open = false;
      state.content = undefined;
      state.buttons = [];
      state.showOkButton = false;
    }
  }
});

export const {
  openModal,
  closeModal,
  setButtons,
  setContent,
  initialState
} = modalSlice.actions;

export default modalSlice.reducer;
