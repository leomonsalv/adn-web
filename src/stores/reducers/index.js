import { combineReducers } from '@reduxjs/toolkit';

import auth from '../actions/auth';
import profile from '../actions/profile';
import notification from '../actions/notification';
import loader from '../actions/loader';
import modal from '../actions/modal';

export default combineReducers({
  auth,
  notification,
  modal,
  loader,
  profile
});
