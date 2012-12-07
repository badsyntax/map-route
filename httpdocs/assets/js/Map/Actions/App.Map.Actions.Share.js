App.Map.Actions.Share = function() {
  App.Map.Actions.Action.apply(this, arguments);
};

App.inherits(App.Map.Actions.Share, App.Map.Actions.Action);

App.Map.Actions.Share.prototype.execute = function() {
  App.UI.Modal.show('#modal-share', {
    heading: 'Share'
  }, {
    url: 'http://maproute.proxima.cc/#/route/' + App.Map.Route.model().id()
  })
};

App.Map.Actions.Share.prototype.reset = function() {
  App.Map.Actions.Action.prototype.reset.apply(this, arguments);
};