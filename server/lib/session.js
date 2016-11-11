// Session standin for server side rendering.
export const Session = (function() {
  let store = {};
  return {
    set: function(key, value) {
        store[key] = value;
    },
    get: function(key) {
      return store[key];
    }
  }
})();
