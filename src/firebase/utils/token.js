const ACCESS_TOKEN = 'access_token';

export const getToken = () => JSON.parse(sessionStorage.getItem(ACCESS_TOKEN));

export const setToken = (token) => sessionStorage.setItem(ACCESS_TOKEN, JSON.stringify(token));

export const removeToken = () => sessionStorage.removeItem(ACCESS_TOKEN);
