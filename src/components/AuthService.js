import Cookies from 'js-cookie';


const TOKEN_KEY = 'jwtToken';

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token,{expires:1});
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};



export const saveUserIdInCookies = (userId) => {
  Cookies.set('userId', userId, { expires: 1 }); 
};

export const getUserIdFromCookies = () => {
  return Cookies.get('userId');
};



