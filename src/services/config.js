import axios from 'axios';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: process.env.REACT_APP_SERVER_URL
});

export default instance;
