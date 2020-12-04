import API from './config';
import {
  SIGN_IN
} from './urls';

const signIn = (values) => API.post(SIGN_IN, values);

export default {
  signIn,
};
