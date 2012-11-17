// app.js
var App = {
  Controllers: {},
  Map: {},
  Toolbar: {
    Actions: {}
  },
  Models: {},
  ViewModels: {},
  UI: {},
  Config: {}
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