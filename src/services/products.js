import API from './config';
import {
  GET_PRODUCTS
} from './urls';

const getProducts = () => API.get(GET_PRODUCTS);

export default {
  getProducts
};
