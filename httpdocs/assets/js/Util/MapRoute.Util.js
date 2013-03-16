/* Logging */
MapRoute.log = function() {
  if (MapRoute.Config.get('debug') === true && console && console.log) {
    console.log.apply(console, arguments);
  }
};