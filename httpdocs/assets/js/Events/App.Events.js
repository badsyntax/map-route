App.Events = function() {
  this._e = $('<i />');
};

App.Events.prototype = {
  on: function(name, handler) {
    this._e.on(name, handler);
  },
  off: function(name, handler) {
    this._e.off(name, handler);  
  },
  trigger: function(name) {
    this._e.trigger(name);
  }
};