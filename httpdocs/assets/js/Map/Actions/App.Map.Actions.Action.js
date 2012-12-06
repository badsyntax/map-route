App.Map.Actions.Action = function() {
  this.handlers = [];
};

App.Map.Actions.Action.prototype.execute = function() {
  this.bindEvents();
};

App.Map.Actions.Action.prototype.bindEvents = function() {
};

App.Map.Actions.Action.prototype.reset = function() {
  $.each(this.handlers, function(i, handler) {
    handler.remove();
  });
};