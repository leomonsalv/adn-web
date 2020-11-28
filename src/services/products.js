import API from './config';
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID
} from './urls';

const getProducts = () => API.get(GET_PRODUCTS);

const getProductById = (id) => API.get(`${GET_PRODUCT_BY_ID}/${id}`);

export default {
  getProducts,
  getProductById
};
