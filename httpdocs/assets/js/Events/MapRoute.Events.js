MapRoute.Events = function() {
  this._e = $('<i />');
};

MapRoute.Events.prototype = {
  on: function() {
    this._e.on.apply(this._e, arguments);
  },
  off: function() {
    this._e.off.apply(this._e, arguments);
  },
  trigger: function() {
    this._e.trigger.apply(this._e, arguments);
  }
};

MapRoute.Events.delegate = function(e, handlers) {

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

MapRoute.GlobalEvents = new MapRoute.Events();