var App = {
  Controllers: {},
  Models: {},
  ViewModels: {},
  UI: {},
  Config: {},
  API: {}
};

App.log = function() {
  if (App.Config.get('debug') === true && console && console.log) {
    console.log.apply(console, arguments);
  }
};

Object.inherits = function(_super, _sub) {

  var proto = Object.create(_super.prototype);

  // Mixin the sub-class
  for (var prop in _sub) {
    if (_sub.hasOwnProperty(prop)) {
      proto[prop] = _sub[prop];
    }
  }

  return proto;
};