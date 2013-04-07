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

ko.bindingHandlers.fadeIn = {
  init: function(element, valueAccessor) {
    $(element).hide();
  },
  update: function(element, valueAccessor) {
    var config = valueAccessor();
    $(element).fadeIn(config.speed, config.callback);
  }
};

ko.bindingHandlers.fadeToggle = {
  init: function(element, valueAccessor) {
    $(element).hide();
  },
  update: function(element, valueAccessor) {

    element = $(element).hide();
    var value = valueAccessor();

    if (!ko.utils.unwrapObservable(value)) {
      return;
    }
    element.stop(true, true).hide().fadeIn(160, function() {
      setTimeout(function() {
        element.fadeOut(660, function() {
          value(false);
        });
      }, 3000);
    });
  }
};

ko.bindingHandlers.scroller = {
  init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    $(element)
    .addClass('scroller')
    .wrapInner('<div class="viewport"></div>')
    .prepend('<div class="scrollbar"><div class="track"><div class="thumb"></div></div></div>')
    .tinyscrollbar();
  }
};

ko.bindingHandlers.uiTabs = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {

      var scrollBar;

      $(window).on('resize.tabs', onWindowResize);

      $(element).find('a')
      .on('click', onTabClick)
      .eq(0)
      .trigger('click');

       MapRoute.GlobalEvents.on([
        'removemarker',
        'addmarker',
        'removepoint',
        'addpoint'
      ].join(' '), onWindowResize);

      function onWindowResize() {
        if (scrollBar) {
          scrollBar.update('relative');
        }
      }

      function onTabClick(e) {

        e.preventDefault();

        alert('test');

        $(e.target).tab('show');

        var scrollBarElem = $(
          e.target
          .href
          .replace(/.*(?=#[^\s]*$)/, '')
        );

        scrollBar = scrollBarElem.data('tsb');
        onWindowResize();
      }
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
      .append('<span class="label-errormsg"> <i class="icon-info-sign"></i> ' + msg + '</span>');
    });

    form.find('.error:first input:first').focus();
  }

  function resetErrors() {
    form.find('.error').removeClass('error');
    form.find('.label-errormsg,.alert').remove();
  }

  function onSuccess(data) {
    MapRoute.GlobalEvents.trigger('ajax.msg.success');
    form.trigger('save-success', data);
    $(window).trigger('resize');
  }

  function onError(jqXHR) {
    form.trigger('save-error');
    if (jqXHR.responseText && jqXHR.getResponseHeader("content-type").indexOf('json') >= 0) {
      var errors = $.parseJSON(jqXHR.responseText).errors;
      showErrors(errors);
    }
  }

  function onFormSubmit(e) {
    e.preventDefault();
    resetErrors();
    model.save(onSuccess, onError);
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