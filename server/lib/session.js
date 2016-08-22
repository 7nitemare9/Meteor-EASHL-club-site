// Session standin for server side rendering.
Session = (function() {
  let store = {};
  return {
    set: function(key, value) {
        store.key = value;
    },
    get: function(key) {
      return store.key;
    }
  }
})();
