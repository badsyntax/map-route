/* Logging */
App.log = function() {
  if (App.Config.get('debug') === true && console && console.log) {
    console.log.apply(console, arguments);
  }
};