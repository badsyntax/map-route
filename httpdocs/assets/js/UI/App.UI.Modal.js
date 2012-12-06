/* Modal UI
 *************************/
App.UI.Modal = (function() {

  var modal = {
    setup: function(controller, container, viewModel) {
      this.controller = controller;
      this.container = container;
      this.viewModel = viewModel;
      this.modal = this.container.find('.modal');
    },
    message: function(content, heading, callback) {
      this.viewModel.defaultValues({
        content: content
      });
      this.open(callback);
    },
    open: function(callback) {

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
    show: function(selector, modalData, bodyData, callback) {

      var elem = $('<div />').html($(selector).html());
      ko.applyBindings(bodyData || {}, elem[0]);

      this.container
        .find('.modal-body')
        .empty()
        .append(elem[0]);

      this.viewModel.values(modalData);

      this.open(callback);
    },
    hide: function() {
      this.modal.modal('hide');
    },
    focus: function(field) {
      field = field || 0;
      this.modal.on('shown', function () {
        this.container.find('input,textarea').eq(field).focus();
      }.bind(this));
    }
  };

  return $.extend(App.Events, modal);
}());