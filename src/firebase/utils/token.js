const ACCESS_TOKEN = 'access_token';
const COOKIE_EXPIRATION_DATE = 'odoo_cookie_expired_time';
const COOKIE_ACCESS_CODE = 'odoo_access_code';

export const getToken = () => JSON.parse(sessionStorage.getItem(ACCESS_TOKEN));

export const setToken = (token) => sessionStorage.setItem(ACCESS_TOKEN, JSON.stringify(token));

export const removeToken = () => sessionStorage.removeItem(ACCESS_TOKEN);

export const setUserIdStorage = (userId) => sessionStorage.setItem('userId', JSON.stringify(userId));

export const removeOdooExpirationDate = () => sessionStorage.removeItem(COOKIE_EXPIRATION_DATE);

export const setAccessCodeOdoo = (odooAccessCode) => sessionStorage.setItem(
  COOKIE_ACCESS_CODE,
  odooAccessCode
);

export const setCookieExpiredTime = (odooCookieExpiredTime) => sessionStorage.setItem(
  COOKIE_EXPIRATION_DATE,
  odooCookieExpiredTime
);

export const getAccessCodeOdoo = () => sessionStorage.getItem(COOKIE_ACCESS_CODE);

export const cleanSessionStorage = () => sessionStorage.clear();
