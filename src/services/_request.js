/*
 * @Author: CuongHx 
 * @Desc: Base API 
 * @Date: 2018-07-11 11:04:29 
 * @Last Modified by: 
 * @Last Modified time: 2018-09-11 20:29:12
 */

import axios from 'axios';
import https from 'https';

import { generateClientError } from '../utils/error-generation';
/**
 * Handling success request
 * Status Code default: 200
 * Successful data: 0 (code)
 * Error data message: 400 (code)
 * Error api message: 500 (code)
 */

const onSuccess = response => {
  try {
    const { data } = response;
    if (data.result) {
      if (!data.data || data.data.message) {
        return data;
      }
      return data.data;
    }
    return data;
  } catch (err) {
    console.log('asdasdasdas', err);
    return generateClientError(500);
  }
};

/**
 * Handling success request
 * Status Code default: 200
 * Successful data: 0 (code)
 * Error data message: 400 (code)
 * Error api message: 500 (code)
 */
const onError = error => {
  try {
    if (error.response) {
      // 404
      // 400
      const { status, data } = error.response;
      if (status >= 400 && status < 500) {
        return { message: (data.data && data.data.message) || '', code: status };
      }
      return generateClientError(error.response.status);
    }
    // 500
    // network or browser error at here
    return generateClientError(500);
  } catch (err) {
    return generateClientError(500);
  }
};

class _api {
  constructor() {
    this.token = '';
    this.headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    };
  }

  getTokenFromLocalStorage = () => {
    try {
      return window.localStorage.getItem('jwt');
    } catch (err) {
      return '';
    }
  };

  setToken = token => {
    this.token = token;
    window.localStorage.setItem('jwt', token);
  };

  request = (opts, cbSuccess, cbError) => {
    return axios({ httpsAgent: new https.Agent({ rejectUnauthorized: false }), ...opts })
      .then(cbSuccess || onSuccess)
      .catch(cbError || onError);
  };

  GET = (url, headers = {}, cbSuccess, cbError) => {
    const opts = {
      method: 'GET',
      url,
      headers: { ...this.headers, ...headers },
      timeout: 3600
    };
    return this.request(opts, cbSuccess, cbError);
  };

  POST = (url, body = {}, headers = {}, cbSuccess, cbError) => {
    const opts = {
      url: url,
      method: 'post',
      data: body instanceof FormData ? body : this.jsonToFormData(body),
      headers: { ...this.headers, ...headers }
    };
    return this.request(opts, cbSuccess, cbError);
  };

  PUT = (url, body = {}, headers = {}, cbSuccess, cbError) => {
    const opts = {
      url: url,
      method: 'put',
      data: body instanceof FormData ? body : this.jsonToFormData(body),
      headers: { ...this.headers, ...headers }
    };

    return this.request(opts, cbSuccess, cbError);
  };

  PATCH = (url, body = {}, headers = {}, cbSuccess, cbError) => {
    const opts = {
      url: url,
      method: 'patch',
      data: body instanceof FormData ? body : this.jsonToFormData(body),
      headers: { ...this.headers, ...headers }
    };

    return this.request(opts, cbSuccess, cbError);
  };

  DELETE = (url, body = {}, headers = {}, cbSuccess, cbError) => {
    const opts = {
      url: url,
      method: 'DELETE',
      data: body instanceof FormData ? body : this.jsonToFormData(body),
      headers: { ...this.headers, ...headers }
    };

    return this.request(opts, cbSuccess, cbError);
  };

  addTokenToHeader = () => {
    if (!this.token) {
      this.token = this.getTokenFromLocalStorage();
    }
    return {
      Authorization: `Bearer ${this.token}`
    };
  };

  jsonToFormData = (obj, form, namespace) => {
    let fd = form || new FormData();
    let formKey;
    if (obj) {
      Object.keys(obj).map(property => {
        if (namespace) {
          formKey = `${namespace}[${property}]`;
        } else {
          formKey = property;
        }
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          this.jsonToFormData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }
      });
    }

    return fd;
  };
}

export default new _api();
