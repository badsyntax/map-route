/* Config
 *************************/
define(['jquery'], function($) {

  var data = {};

  var Config = {
    get: function (key) {
      if (key === undefined) {
        return data;
      }
      var parts = key.split('.');
      var obj = data;
      $.each(key.split('.'), function(i, part) {
        if (!obj) {
          return false;
        }
        obj = obj[ part ];
      });
      return obj;
    },
    set: function (key, val) {

      if (typeof key === 'object' && val === undefined) {
        $.extend(data, key);
        return;
      }

      var obj = data;
      var parts = (key || '').split('.');
      key = parts.pop();

      $.each(parts, function(i, part) {
        if (obj[part] === undefined) {
          obj[part] = {};
        }
        obj = obj[part];
      });

      if (typeof obj[key] === 'object' && typeof val === 'object') {
        $.extend(obj[key], val);
      } else {
        obj[key] = val;
      }
    },
    remove: function(key) {
      if (key !== undefined) {
        delete data[key];
      } else {
        data = {};
      }
    }
  };
  return Config;
});