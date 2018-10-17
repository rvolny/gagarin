// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Import i18n internationalization
import VueI18n from 'vue-i18n'
import Messages from './messages.js'

// Use BootstrapVue
Vue.use(BootstrapVue)
Vue.config.productionTip = false

// Use VueI18n
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'sk', // set locale
  messages: Messages // set locale messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  template: '<App/>',
  components: {App}
})
