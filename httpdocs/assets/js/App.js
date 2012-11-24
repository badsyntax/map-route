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

  function F() {};
  F.prototype = _super.prototype;

  _sub.prototype = new F();
  _sub.prototype.constructor = _sub;
}; 