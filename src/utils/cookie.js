import Cookies from 'js-cookie';

export const getCookie = (name) => (name ? Cookies.getJSON(name) : null);

export const setCookie = ({ name, value, expires = 7 }) => Cookies.set(name, value, { expires });

export const removeCookie = (name) => Cookies.remove(name);
