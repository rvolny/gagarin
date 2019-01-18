// Create tools plugin
// @link https://vuejs.org/v2/guide/plugins.html

export default {
  install (Vue, options) {
    Vue.prototype.$utils = {
      objectExtend (obj, src) {
        Object.keys(src)
          .forEach(function (key) {obj[key] = src[key];});
        return obj;
      }
    };
  }
};
