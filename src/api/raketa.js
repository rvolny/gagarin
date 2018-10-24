// Import Vue
import Vue from 'vue';
import * as Const from '../const';

// List of all available raketa api
// const BASE_URL = 'http://raketa.local/api';
const API = {
  'ME': Const.BASE_API_URL + '/v1/me'
};

export default {

//   getProducts (cb) {
//     setTimeout(() => cb(_products), 100);
//   },
//
//   buyProducts (products, cb, errorCb) {
//     setTimeout(() => {
//       // simulate random checkout failure.
//       (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
//         ? cb()
//         : errorCb();
//     }, 100);
//   },
//
  getUserInfo () {
    return Vue.axios.get(API.ME)
      .then(response => {
        return response.data;
      });
  }
};
