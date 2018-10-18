// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Import i18n internationalization
import VueI18n from 'vue-i18n'
import Messages from './messages.js'
// Import Axios
import VueAxios from 'vue-axios'
import axios from 'axios'
// Import authentication
import { VueAuthenticate } from 'vue-authenticate'

// Use BootstrapVue
Vue.use(BootstrapVue)
Vue.config.productionTip = false

// Use Vuex for state management
Vue.use(Vuex)

// Use VueI18n
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'sk', // set locale
  messages: Messages // set locale messages
})

// Use Axios
Vue.use(VueAxios, axios)

// Use authentication
const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  // TODO: load from local .env
  baseUrl: 'http://raketa.local/api'
})

// Init vuex store
const store = new Vuex.Store({
  state: {
    isAuthenticated: false
  },
  getters: {
    isAuthenticated: state => {
      return state.isAuthenticated
    }
  },
  mutations: {
    isAuthenticated (state, payload) {
      state.isAuthenticated = payload.isAuthenticated
    }
  },
  actions: {
    // Perform VueAuthenticate login using Vuex actions
    login (context, payload) {
      return new Promise((resolve, reject) => {
        vueAuth.login(payload.user, payload.requestOptions).then((response) => {
          context.commit('isAuthenticated', {
            isAuthenticated: vueAuth.isAuthenticated()
          })
          resolve()
        }).catch(() => {
          reject()
        })
      })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  template: '<App/>',
  components: {App}
})
