export const BASE_URL = "https://empress-api.onrender.com";

/* ----- authentication ----- */
export const LOGIN = `${BASE_URL}/server/auth/login`;

export const REGISTER = `${BASE_URL}/server/auth/register`;

export const FORGET_PASSWORD = `${BASE_URL}/server/auth/forgot-password`;

export const RESET_PASSWORD = `${BASE_URL}/server/auth/reset-password`;

/* ----- profile ----- */
export const UPDATE_PROFILE = `${BASE_URL}/server/user/profile`;

/* ----- user list ----- */
export const GET_USER_LIST = `${BASE_URL}/server/user/userslist`;

export const DELTE_USET_LIST = `${BASE_URL}/server/user/userslist`;

/* ----- items ----- */
export const GET_ITEM = `${BASE_URL}/server/items`;

export const GET_ITEM_DETAIL = `${BASE_URL}/server/items/item`;

export const ADMIN_GET_ITEM = `${BASE_URL}/server/items/admin`;

export const POST_ITEM = `${BASE_URL}/server/items/create`;

export const DELETE_ITEM = `${BASE_URL}/server/items/item`;

export const EDIT_ITEM = `${BASE_URL}/server/items/item`;

export const UPDATE_ITEM = `${BASE_URL}/server/items/item`;

/* ----- image ----- */
export const UPLOAD_IMAGE = `${BASE_URL}/server/upload`;

/* ----- categories ----- */
export const GET_CATEGORIES = `${BASE_URL}/server/items/categories`;

/* ----- brand ----- */
export const GET_BRAND = `${BASE_URL}/server/items/brands`;

/* ----- order ----- */
export const GET_ORDER_LIST = `${BASE_URL}/server/orders/admin`;

export const DELETE_ORDER = `${BASE_URL}/server/orders/order`;

export const GET_ORDER_HISTORY = `${BASE_URL}/server/orders/client`;

export const POST_ORDER = `${BASE_URL}/server/orders/new`;

export const GET_ORDET_DETAIL = `${BASE_URL}/server/orders`;

export const DELIVER_ORDER = `${BASE_URL}/server/orders`;

/* ----- payment ----- */
export const PAYPAL_PAYMENT = `${BASE_URL}/server/orders`;

export const GET_PAYPEL_KEYS = `${BASE_URL}/server/keys/paypal`;

export const STRIPE_PAYMENT = `${BASE_URL}/server/payment/create-checkout-session`;

/* ----- reviews ----- */
export const POST_REVIEW = `${BASE_URL}/server/items`;

/* ----- summary data ----- */
export const GET_SUMMARY = `${BASE_URL}/server/orders/summary`