ko.bindingHandlers.fadeVisible = {
  init: function(element, valueAccessor) {
    $(element).hide();
  },
  update: function(element, valueAccessor) {
    var value = valueAccessor();
    if (ko.utils.unwrapObservable(value)) {
      $(element).fadeIn(160);
    } else {
      $(element).fadeOut(160);
    }
  }
};

ko.bindingHandlers.scroller = {
  init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    $(element)
    .wrapInner('<div class="viewport"></div>')
    .prepend('<div class="scrollbar"><div class="track"><div class="thumb"></div></div></div>');
  }
};

ko.bindingHandlers.saveModel = (function(model) {

  function onFormSubmit(e) {
    e.preventDefault();
    model.save();
  }

  return {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      model = ko.utils.unwrapObservable(valueAccessor());
      $(element).on('submit', onFormSubmit.bind(this));
    }
  };
}());