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
import veeValidationMessagesEn from 'vee-validate/dist/locale/en';
import veeValidationMessagesSk from 'vee-validate/dist/locale/sk';
// Import raketa api
import raketa from './api/raketa';
// Import transitions
import SmoothReflow from './components/gui/SmoothReflow';
// Import plugins
import Utils from './plugins/Utils';
// Import constants
import * as Const from './const';

Vue.config.productionTip = false;

// Use Vuex for state management
Vue.use(Vuex);

// Use VueI18n
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'sk', // set locale
  messages: Messages, // set locale messages
  silentTranslationWarn: true
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
  dictionary: {
    en: veeValidationMessagesEn,
    sk: veeValidationMessagesSk
  },
  errorBagName: 'errors', // change if property conflicts
  events: 'blur',
  fieldsBagName: 'fields',
  i18n, // the vue-i18n plugin instance
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
    user: {},
    lists: {
      documentTypes: [],
      insuranceRanges: [],
      packageTypes: [],
      transportationTypes: []
    }
  },
  getters: {
    isAuthenticated: state => {
      return state.isAuthenticated;
    },
    isSender: state => {
      return state.isAuthenticated && typeof (state.user.sender) !=
        'undefined' && state.user.sender !== null;
    },
    isCourier: state => {
      return state.isAuthenticated && typeof (state.user.courier) !=
        'undefined' && state.user.courier !== null;
    },
    getAuthToken: state => {
      return vueAuth.getToken();
    },
    packageTypesListIds: state => {
      let ids = [];
      state.lists.documentTypes.forEach(function (element) {
        ids.push(element.id);
      });
      return ids.join(',');
    },
    insuranceRangesListIds: state => {
      let ids = [];
      state.lists.insuranceRanges.forEach(function (element) {
        ids.push(element.id);
      });
      return ids.join(',');
    }
  },
  mutations: {
    isAuthenticated (state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
    },
    user (state, payload) {
      state.user = payload;
    },
    updateList (state, payload) {
      switch (payload.list) {
        case 'documentTypes':
          state.lists.documentTypes = payload.data;
          break;
        case 'insuranceRanges':
          state.lists.insuranceRanges = payload.data;
          break;
        case 'packageTypes':
          state.lists.packageTypes = payload.data;
          break;
        case 'transportationTypes':
          state.lists.transportationTypes = payload.data;
          break;
      }
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

    // Logout user from application
    logout (context) {
      vueAuth.logout()
        .then(response => {
          context.commit('isAuthenticated', {
            isAuthenticated: vueAuth.isAuthenticated()
          });

          // Return to home page
          router.push({name: 'Home'});
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

    // Get required user data after login
    getUserData (context) {
      if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
        console.log('Loading user data');
      }

      raketa.getUserInfo()
        .then(response => {
          context.commit('user', response);
        });
    },

    // Remove user data after logout
    removeUserData (context) {
      if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
        console.log('Removing user data');
      }

      context.commit('user', {});
    },

    // Get all common lists
    getLists (context) {
      if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
        console.log('Loading common lists');
      }

      // Get document types
      raketa.getDocumentTypes()
        .then(response => {
          context.commit('updateList', {
            list: 'documentTypes',
            data: response
          });
        });

      // Get insurance ranges
      raketa.getInsuranceRanges()
        .then(response => {
          context.commit('updateList', {
            list: 'insuranceRanges',
            data: response
          });
        });

      // Get package types
      raketa.getPackageTypes()
        .then(response => {
          context.commit('updateList', {
            list: 'packageTypes',
            data: response
          });
        });

      // Get transportation types
      raketa.getTransportationTypes()
        .then(response => {
          context.commit('updateList', {
            list: 'transportationTypes',
            data: response
          });
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
    console.log(error);
  }
  return Promise.reject(error);
});

// Add a response interceptor for logging
Vue.axios.interceptors.response.use(function (response) {
  // Do something with response data
  if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
    console.log(
      `↳ Call to ${response.config.url} finished with status ${response.status}`);
  }
  return response;
}, function (error) {
  // Do something with response error
  if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
    console.log(`✗ Error response from api`);
    console.log(error);
  }
  return Promise.reject(error);
});

// Register global components
Vue.component('SmoothReflow', SmoothReflow);

// Use plugins
Vue.use(Utils);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  template: '<App/>',
  components: {App}
});
