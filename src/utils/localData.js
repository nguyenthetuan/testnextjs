/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-10 18:53:24
 */

const savedDataKey = 'e-employer-remember';
const saveLangue = 'langauge';

const setCookieData = (name, data, days) => {
  let expires = '';
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${data || ''}${expires}; path=/`;
};

export const saveRememberAuthData = data => {
  const savedData = typeof data !== 'string' ? JSON.stringify(data) : data;
  if (window.localStorage) {
    window.localStorage.setItem(savedDataKey, savedData);
  } else {
    setCookieData(savedDataKey, saveLangue);
  }
};

export const saveLanguage = data => {
  const savedData = typeof data !== 'string' ? JSON.stringify(data) : data;
  if (window.localStorage) {
    window.localStorage.setItem(saveLangue, savedData);
  } else {
    setCookieData(saveLangue, saveLangue);
  }
};

function getCookie(name) {
  let b = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  return b ? b.pop() : '';
}

export const getLanguage = () => {
  let data;
  if (window.localStorage) {
    data = window.localStorage.getItem(saveLangue);
  } else {
    data = getCookie(saveLangue);
  }

  try {
    data = JSON.parse(data);
  } catch (error) {
    data = null;
    console.log('get auth data saved fail!', error);
  }

  return data;
};

export const getRememberAuthData = () => {
  let data;
  if (window.localStorage) {
    data = window.localStorage.getItem(savedDataKey);
  } else {
    data = getCookie(savedDataKey);
  }

  try {
    data = JSON.parse(data);
  } catch (error) {
    data = null;
    console.log('get auth data saved fail!', error);
  }

  return data;
};

export const deleteRemberAuthData = (signout = false) => {
  if (signout) {
    saveRememberAuthData({ signedout: true });
  } else if (window.localStorage) {
    window.localStorage.removeItem(savedDataKey);
  } else {
    setCookieData(savedDataKey, '');
  }
};