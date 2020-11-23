import API from './config';
import {
  ROL_VERIFICATION
} from './urls';

const roleVerification = (id) => API.post(`${ROL_VERIFICATION}/${id}`);

export default {
  roleVerification
};
