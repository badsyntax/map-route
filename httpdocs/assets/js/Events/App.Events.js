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