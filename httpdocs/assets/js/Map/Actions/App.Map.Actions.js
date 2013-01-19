App.Map.Actions = (function() {
  
  var instances = {};

  return {
    factory: function(action) {
      instances[action] = new App.Map.Actions[action]();
      return instances[action];
    },
    getInstance: function(action) {
      return instances[action];
    },
    reset: function() {
      $.each(instances, function(i, action) {
        action.reset();
      });
    },
    execute: function(action) {
      var markersAction = this.getInstance(action);
      markersAction.execute();
    }
  };
}());