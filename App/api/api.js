const BASE_URL = 'http://orderingapp.carvingit.com/api';

export const LoginAPI = body =>
  fetch(BASE_URL + '/user/get-token', {method: 'POST', body});

export const SignupAPI = body =>
  fetch(BASE_URL + '/user/register', {method: 'POST', body});

export const UserRoleAssignAPI = data =>
  fetch(BASE_URL + '/user/assignrole', {
    method: 'POST',
    headers: {Authorization: `Bearer ${data.token}`},
    body: data.formData,
  });

export const ListofCategoriesAPI = token =>
  fetch(BASE_URL + '/taxonomies', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const ListofProductAPI = (token,id) =>
  fetch(BASE_URL + `/category/${id}/products/0/100`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const ProductDetailsAPI = (token, id) =>
  fetch(BASE_URL + `/product/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const GetProductImage = (token, url) =>
  fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const ViewBuisnessDetailsAPI = (token, user_id) =>
  fetch(BASE_URL + `/seller/${user_id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const ListofBuisnessProfileAPI = token =>
  fetch(BASE_URL + '/sellerprofiles/0/100', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const SellerRequestAPI = (token, data) =>
  fetch(BASE_URL + '/save_user_seller_request', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

export const SaveSellerBuisness = (token, data) =>
  fetch(BASE_URL + '/saveseller', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

export const RemoveBuisnessAPI = data =>
  fetch(BASE_URL + '/seller/delete', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    body: data.formData,
  });
