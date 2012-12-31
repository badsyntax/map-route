ko.bindingHandlers.fadeVisible = {
  init: function(element, valueAccessor) {
    $(element).hide();
  },
  update: function(element, valueAccessor) {
    var value = valueAccessor();
    ko.utils.unwrapObservable(value) ? $(element).fadeIn(160) : $(element).fadeOut(160);
  }
};