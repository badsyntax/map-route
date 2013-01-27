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

App.Events.delegate = function(e, handlers) {

   var executeHandler = (function(target) {
    return function(key, handler, elem) {
      if ((elem = target.closest(key)).length && elem[0] !== document.body) {
        handler(e, elem[0]);
        return false;
      }
    };
  }($(e.target)));

  $.each(handlers, executeHandler);
};

App.GlobalEvents = new App.Events();

Globalize.culture('en-GB');