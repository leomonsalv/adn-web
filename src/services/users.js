import API from './config';
import { CREATE_USER, GET_USER_BY_ID, UPDATE_USER } from './urls';

const createUser = (values) => API.post(CREATE_USER, values);

const getUserById = (id) => API.get(`${GET_USER_BY_ID}/${id}`);

const updateUser = (values, id) => API.put(`${UPDATE_USER}/${id}`, values);

export default {
  createUser,
  getUserById,
  updateUser
};
