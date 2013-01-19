App.Map.Actions.Share = function() {
  App.Map.Actions.Action.apply(this, arguments);
};

App.Map.Actions.Share.prototype = Object.inherits(App.Map.Actions.Action, {
  execute: function() {
    App.UI.Modal.show('#modal-share', {
      heading: 'Share'
    }, {
      url: 'http://maproute.proxima.cc/#/route/' + App.Map.Route.model().id()
    });
  },
  reset: function() {
    App.Map.Actions.Action.prototype.reset.apply(this, arguments);
  }
});