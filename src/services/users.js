import API from './config';
import { CREATE_USER } from './urls';

const createUser = (values) => API.post(CREATE_USER, values);

export default {
  createUser
};
