import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { cleanProfile } from '../stores/actions/profile';
import { loading, loadingWithSpinner, loaded } from '../stores/actions/loader';
import { showNotification } from '../stores/actions/notification';
import firebase from '../firebase';
import { getToken, removeToken } from '../firebase/utils/token';
import API from './config';

const interceptorRequest = async (request, store) => {
  const method = request.method.toUpperCase();

  store.dispatch(method === 'GET' ? loading() : loadingWithSpinner());

  if (request.data && request.data.register) {
    return request;
  }
  const accessToken = getToken();
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  request.cancelToken = source.token;
  let validToken = false;
  let isExpired = false;

  try {
    const token = await jwtDecode(accessToken);
    if (Date.now() >= token.exp * 1000) {
      validToken = false;
      isExpired = true;
    } else {
      validToken = true;
    }
  } catch {
    validToken = false;
  }

  const errorMessage = isExpired ? 'Token Expired' : 'Invalid Token';

  if (accessToken && validToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    source.cancel(errorMessage);
    removeToken();
    firebase.signOut();
    store.dispatch(
      showNotification({
        type: 'error',
        message: 'Error Access Token',
        content: errorMessage
      })
    );
    store.dispatch(cleanProfile());
  }
  return request;
};

const interceptorResponse = (response, store) => {
  if (response.status === 201) {
    store.dispatch(
      showNotification({
        type: 'success',
        message: 'Info',
        content: response.data.message
      })
    );
  }

  store.dispatch(loaded());

  return response;
};

const handleErrorResponse = (error, store) => {
  store.dispatch(
    showNotification({
      type: 'error',
      message: `Error ${error.response?.status}`,
      content: error.response?.data.message || error.message
    })
  );

  store.dispatch(loaded());
  return error;
};

const Interceptor = (store) => {
  API.interceptors.request.use((request) => interceptorRequest(request, store));

  API.interceptors.response.use(
    (response) => interceptorResponse(response, store),
    (error) => handleErrorResponse(error, store)
  );
};

export default {
  Interceptor
};
