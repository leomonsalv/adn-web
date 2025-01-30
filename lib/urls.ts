/* eslint-disable no-undef */
// ODOO
export const GET_PRODUCTS = 'odoo-getProducts';
export const GET_PRODUCT_BY_ID = 'odoo-getProduct?id=';
export const GET_RECOMMENDED_PRODUCTS = 'odoo-getRecommendedProducts';
export const GET_RECOMMENDED = 'odoo-getRecommended';
export const GET_OFFERS = 'odoo-getOffers';
export const GET_CATEGORIES = 'externos-getCategories';
export const GET_TOP_SELLERS_PRODUCTS = 'products-topSellingProducts';

// Products Availability
export const GET_PRODUCTS_AVAILABILITY = `${process.env.REACT_APP_ODOO_API_URL}/apis/checkInventary`;

// Privado
export const CREATE_ORDER = 'odoo-createOrderV2';
export const CHECK_COUPON = 'es-couponData';
export const CART_CALCULATION = 'es-cartCalculation';
export const SAVE_ADDRESS = 'addresses-saveAddress';

//OTP Validation
export const OTP_GENERATION = 'otp-createSmsOTP';
export const OTP_VALIDATION = 'otp-validateOTP';
export const OTP_EMAIL_GENERATOR = '/otp-createEmailOTP';

// ADMIN
export const GET_AVAILABLE_DATES = 'admin-getAvailableDates';

// Koroto
export const KOROTO_VALIDATOR = '/references/validator';

// Reference
export const GET_REFERENCE = 'odoo-getReference';

// viraLoops

export const VIRALOOPSREGISTER = 'users-invitadoRegistrado';

// Referral
export const REFERRALINFO = 'users-referralInfo';

// Paypal

export const CLIENTTOKEN = 'externos-paypal-getClientToken';
export const CREATEORDERPAYPAL = 'externos-paypal-createOrder';

// Banesco

export const BANESCO = 'pubsub-publishMessage';

// Delete Account

export const USERDELETE = 'users-deleteUser';

// Vippo

export const VIPPO_VALIDATE = 'externos-vippo-validateCard';
export const VIPPO_QUERY_TXS = 'externos-vippo-queryTxs';
export const VIPPO_CLOSE_LOT = 'externos-vippo-closeLot';
