import { combineReducers } from '@reduxjs/toolkit';

import auth from '../actions/auth';
import profile from '../actions/profile';
import notification from '../actions/notification';
import loader from '../actions/loader';

export default combineReducers({
  auth,
  notification,
  loader,
  profile
});
