const BASE_URL = 'https://orderingapp.carvingit.com/api';

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

export const ListofProductAPI = (token, id) =>
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

export const RemoveBuisnessAPI = (token, data) =>
  fetch(BASE_URL + '/seller/delete', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

export const MyBuisnessessAPI = token =>
  fetch(BASE_URL + '/my-sellerprofiles/0/10', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const MyProductsAPI = token =>
  fetch(BASE_URL + '/my-products/0/10', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const UploadProductPhotoAPI = (token, data) =>
  fetch(BASE_URL + '/product/upload/image', {
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`,},
    body: data,
  });

export const SaveProductAPI = (token, data) =>
  fetch(BASE_URL + '/saveproduct', {
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`,},
    body: data,
  });

export const ListofCategoryAPI = token =>
  fetch(BASE_URL + '/taxonomies', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
export const ListofCategoryWiseProductsAPI = token =>
  fetch(BASE_URL + '/category/15/products/0/10', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
export const LoadProductImageAPI = (product_id,image_id,token) =>
  fetch(BASE_URL + `/product/${product_id}/loadimage/${image_id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const UploadProductVideoUrlAPI = (token, data) =>
  fetch(BASE_URL + '/product/upload/video_url', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
export const DeleteProductAPI = (token, data) =>
  fetch(BASE_URL + '/product/delete', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  export const ForgotPasswordAPI = (data) =>
    fetch(BASE_URL + '/forgot-password', {
      method: 'POST',
      body: data,
    });
  
export const ListofAnnouncementsAPI = async (token, page = 0, size = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${page}/${size}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', 
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data.events; 
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error; 
  }
};


export const MarkAnnouncementAsReadAPI = async (token, announcementId) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${announcementId}/read`, { 
      method: 'PUT', 
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', 
      },
      
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || JSON.stringify(errorData)}`);
    }

    return response.status === 204 ? {} : await response.json(); 
  } catch (error) {
    console.error(`Error marking announcement ${announcementId} as read:`, error);
    throw error;
  }
};
  