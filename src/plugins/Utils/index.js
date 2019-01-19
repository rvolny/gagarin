// Create tools plugin
// @link https://vuejs.org/v2/guide/plugins.html

export default {
  install (Vue, options) {
    Vue.prototype.$utils = {
      // Adds src keys to obj
      extendObject (obj, src) {
        Object.keys(src)
          .forEach(function (key) {obj[key] = src[key];});
        return obj;
      },

      // Creates new object as a result of a merge of 2 objects
      mergeObjects (obj1, obj2) {
        let merged = {};
        Object.keys(obj1)
          .forEach(function (key) {merged[key] = obj1[key];});
        Object.keys(obj2)
          .forEach(function (key) {merged[key] = obj2[key];});
        return merged;
      }
    };
  }
};
