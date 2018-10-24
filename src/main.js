// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';
// Import i18n internationalization
import VueI18n from 'vue-i18n';
import Messages from './messages.js';
// Import Axios
import VueAxios from 'vue-axios';
import axios from 'axios';
// Import authentication
import { VueAuthenticate } from 'vue-authenticate';
// Import form validations
import VeeValidate from 'vee-validate';
// Import raketa api
import raketa from './api/raketa';
// Import constants
import * as Const from './const';

Vue.config.productionTip = false;

// Use Vuex for state management
Vue.use(Vuex);

// Use VueI18n
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'sk', // set locale
  messages: Messages // set locale messages
});

// Use Axios
Vue.use(VueAxios, axios);

// Use authentication
const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: Const.BASE_API_URL
});

// Use validations
const veeValidateConfig = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: null,
  errorBagName: 'errors', // change if property conflicts
  events: 'blur',
  fieldsBagName: 'fields',
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation
                              // messages will be located
  inject: true,
  locale: 'en',
  validity: false
};
Vue.use(VeeValidate, veeValidateConfig);

// Init vuex store
const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: {}
  },
  getters: {
    isAuthenticated: state => {
      return vueAuth.isAuthenticated();
    },
    user: state => {
      return this.user;
    }
  },
  mutations: {
    isAuthenticated (state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
    },
    user (state, payload) {
      state.user = payload;
    }
  },
  actions: {
    // Perform VueAuthenticate login using Vuex actions
    login (context, payload) {
      return new Promise((resolve, reject) => {
        vueAuth.login(payload.user, payload.requestOptions)
          .then(response => {
            context.commit('isAuthenticated', {
              isAuthenticated: vueAuth.isAuthenticated()
            });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // Check if token is already present and if it is, log user in
    checkAuthentication (context) {
      if (vueAuth.isAuthenticated()) {
        if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
          console.log('Auth token found\nPerforming automatic login');
        }
        context.commit('isAuthenticated', {
          isAuthenticated: vueAuth.isAuthenticated()
        });
      } else {
        if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
          console.log('Auth token not found');
        }
      }
    },
    getUserInfo (context) {
      raketa.getUserInfo()
        .then(response => {
          context.commit('user', response);
        });
    }
  }
});

// Add a request interceptor for logging
Vue.axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
    console.log(`Calling ${config.url}`);
  }
  return config;
}, function (error) {
  // Do something with request error
  if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
    console.log(`Error calling api`);
  }
  return Promise.reject(error);
});

// Add a response interceptor for logging
Vue.axios.interceptors.response.use(function (response) {
  // Do something with response data
  if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
    console.log(
      `Calling ${response.config.url} with status ${response.status}`);
  }
  return response;
}, function (error) {
  // Do something with response error
  if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
    console.log(`Error response from api`);
  }
  return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  template: '<App/>',
  components: {App}
});