import API from './config';
import {
  GET_ODOO_AUTH,
  GET_ODOO_BY_ID,
  GET_ODOO,
  POST_ODOO,
  REGISTER_CLIENT_ODOO
} from './urls';

const getOdooAuth = () => API.get(GET_ODOO_AUTH);
const getOdoo = (body) => API.post(GET_ODOO, body);
const getOdooById = (id, body) => API.post(`${GET_ODOO_BY_ID}/${id}`, body);
const postOdoo = (body) => API.post(POST_ODOO, body);
const registerClientOdoo = (body) => API.post(REGISTER_CLIENT_ODOO, body);

export default {
  getOdooAuth,
  getOdoo,
  getOdooById,
  postOdoo,
  registerClientOdoo
};
