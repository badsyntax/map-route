/* Modal UI
 *************************/
App.UI.Modal = (function() {
  return $.extend(App.Events, {
    setup: function(controller, container, viewModel) {
      this.controller = controller;
      this.container = container;
      this.spinner = this.container.find('.spinner');
      this.viewModel = viewModel;
      this.modal = this.container.find('.modal');
      this.bindEvents();
    },
    bindEvents: function(){
    },
    show: function(message, callback) {
      
      if (message) {
        this.viewModel.content(message);
      }

      this.modal
      .on('shown', callback)
      .modal({
        show: true
      })
      .css({
        'margin-top': function () {
          return -($(this).height() / 2);
        }
      });

      this.focus();
    },
    hide: function() {
      this.modal.modal('hide');
    },
    focus: function(field) {
      field = field || 0;
      this.modal.on('shown', function () {
        this.container.find('input,textarea').eq(field).focus();
      }.bind(this));
    },
    loading: function(state) {
      if (state === true) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    }
  });
}());