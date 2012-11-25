// app.js
var App = {
  Controllers: {},
  Models: {},
  ViewModels: {},
  UI: {},
  Config: {},
  API: {}
};

if (!Function.prototype.bind) {
  Function.prototype.bind = function(scope) {
    return $.proxy(this, scope);
  };
}

App.log = function() {
  if (App.Config.get('debug') === true && console && console.log) {
    console.log.apply(console, arguments);
  }
};

App.inherits = function(_sub, _super) {

  function F() {}
  F.prototype = _super.prototype;

  _sub.prototype = new F();
  _sub.prototype.constructor = _sub;
}; 

App.Events = (function() {
  return {
    _handlers: {},
    on: function(name, handler) {
      if (!this._handlers[name]) {
        this._handlers[name] = $.Callbacks();
      }
      this._handlers[name].add(handler);
    },
    off: function(name, handler) {
      if (handler) {
        return this._handlers[name].remove(handler);
      }
      this._handlers[name].empty();
    },
    trigger: function(name) {
      var args = Array.prototype.slice.call(arguments, 1);
      if ($.isFunction(name)) {
        return name.apply(this, args);
      }
      if (this._handlers[name]) {
        this._handlers[name].fireWith(this, args);
      }
    }
  };
}());