/*
 * File: actions/constants.js
 * Desc: defines actions related contants api for systems
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-12 11:23:49
 */
import {
  FETCH_CONSTANTS,
  FETCH_CONSTANTS_SUCCESS,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_FAILED,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CITIES_FAILED,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES
} from './types';

export const fetchConstants = () => {
  return {
    type: FETCH_CONSTANTS
  };
};

export const fetchConstantsSuccess = constants => {
  return {
    type: FETCH_CONSTANTS_SUCCESS,
    payload: { data: constants, message: { code: 0 } }
  };
};

export const fetchConstantsFail = error => {
  return {
    type: FETCH_CONSTANTS_SUCCESS,
    payload: { data: {}, message: error }
  };
};

export const fetchCategories = () => {
  return {
    type: FETCH_CATEGORIES
  };
};

export const fetchCategoriesSuccess = data => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: { data, message: { code: 0 } }
  };
};

export const fetchCategoriesFail = error => {
  return {
    type: FETCH_CATEGORIES_FAILED,
    payload: { data: {}, message: error }
  };
};

export const fetchCities = () => {
  return {
    type: FETCH_CITIES
  };
};

export const fetchCitiesSuccess = data => {
  return {
    type: FETCH_CITIES_SUCCESS,
    payload: { data, message: { code: 0 } }
  };
};

export const fetchCitiesFail = error => {
  return {
    type: FETCH_CITIES_FAILED,
    payload: { data: {}, message: error }
  };
};
