var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // TODO remove when .env config is working
  VUE_APP_BASE_API_URL: '"http://raketa.local/api"',
  VUE_APP_LOG_LEVEL: 5
})
