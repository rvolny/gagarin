// Import Vue
import Vue from 'vue';
import * as Const from '../const';

// List of all available raketa api
// const BASE_URL = 'http://raketa.local/api';
const API = {
  'ME': Const.BASE_API_URL + '/v1/me',
  'CREATE_USER': Const.BASE_API_URL + '/v1/users',
  'CREATE_SENDER_SUFFIX': '/sender',
  'CREATE_COURIER_SUFFIX': '/courier',
  'READ_DOCUMENT_TYPES': Const.BASE_API_URL + '/v1/lists/document-types',
  'READ_INSURANCE_RANGES': Const.BASE_API_URL + '/v1/lists/insurance-ranges',
  'READ_PACKAGE_TYPES': Const.BASE_API_URL + '/v1/lists/package-types',
  'READ_TRANSPORTATION_TYPES': Const.BASE_API_URL +
    '/v1/lists/transportation-types'
};

export default {
  // Get logged in user info
  getUserInfo () {
    return Vue.axios.get(API.ME)
      .then(response => {
        return response.data;
      });
  },

  // Create new user
  createUser (user) {
    return Vue.axios.post(API.CREATE_USER, user);
  },

  // Create sender
  createSender (userId, formData) {
    const url = `${API.CREATE_USER}/${userId}${API.CREATE_SENDER_SUFFIX}`;
    return Vue.axios.post(url, formData);
  },

  // Create courier
  createCourier (userId, formData) {
    const url = `${API.CREATE_USER}/${userId}${API.CREATE_COURIER_SUFFIX}`;
    return Vue.axios.post(url, formData);
  },

  // Get document types list
  getDocumentTypes () {
    return Vue.axios.get(API.READ_DOCUMENT_TYPES)
      .then(response => {return response.data;});
  },

  // Get insurance ranges list
  getInsuranceRanges () {
    return Vue.axios.get(API.READ_INSURANCE_RANGES)
      .then(response => {return response.data;});
  },

  // Get package types list
  getPackageTypes () {
    return Vue.axios.get(API.READ_PACKAGE_TYPES)
      .then(response => {return response.data;});
  },

  // Get transportation types list
  getTransportationTypes () {
    return Vue.axios.get(API.READ_TRANSPORTATION_TYPES)
      .then(response => {return response.data;});
  }
};
