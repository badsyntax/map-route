App.UI.Device = (function(device) {
  
  var win = $(window);
  var winResizeTimer;
  var dimensions = {};

  function bindEvents() {
    device.on('updateDimensions', updateDimensions);
    win.on('resize', onWinResize);
  }

  function isMobile() {
    return dimensions.width < 480;
  }

  function isTablet() {
    return dimensions.width < 768;
  }

  function updateDimensions() {
    dimensions.width = win.width();
    dimensions.height = win.height();
  }

  function onWinResize(e) {
    clearTimeout(winResizeTimer);
    winResizeTimer = setTimeout(function() {
      device.trigger('updateDimensions');
    }, 80);
  }
  
  function init() {
    bindEvents();
    updateDimensions();
  }

  init();

  return $.extend(device, {
    isMobile: isMobile,
    isTablet: isTablet
  });

})(new App.Events);