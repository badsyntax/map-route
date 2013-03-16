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

ko.bindingHandlers.saveModel = (function(model, form) {

  function showErrors(errors) {

    $.each(errors, function addError(key, msg) {
      form
      .find('[data-key=' + key + ']')
      .parents('.control-group')
      .addClass('error')
      .find('label')
      .append('<span class="label-errormsg"> - ' + msg + '</span>');
    });

    form.find('.error:first input:first').focus();
  }

  function resetErrors() {
    form.find('.error').removeClass('error');
    form.find('.label-errormsg').remove();
  }

  function onFormSubmit(e) {
    e.preventDefault();
    resetErrors();
    model.save(
      function success(data) {
        form.trigger('save-success', data);
      },
      function error(jqXHR) {
        form.trigger('save-error');
        if (jqXHR.responseText && jqXHR.getResponseHeader("content-type").indexOf('json') >= 0) {
          var errors = $.parseJSON(jqXHR.responseText).errors;
          showErrors(errors);
        }
      }
    );
  }

  function bindEvents() {
    form.on('submit', onFormSubmit.bind(this));
  }

  return {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      form = $(element);
      model = ko.utils.unwrapObservable(valueAccessor());
      bindEvents();
    }
  };
}());