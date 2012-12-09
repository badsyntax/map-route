/* Modal UI
 *************************/
App.UI.Modal = (function() {

  var modal = {
    setup: function(container, viewModel) {
      this.container = container.find('.modal');
      this.viewModel = viewModel;
    },
    message: function(content, heading, callback) {
      this.viewModel.defaultValues({
        content: content
      });
      this.open(callback);
    },
    open: function(callback) {

      this.container
      .on('shown', callback)
      .modal({
        show: true
      })
      .css({
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
      this.container.modal('hide');
    },
    focus: function(field) {
      field = field || 0;
      this.container.on('shown', function () {
        this.container.find('input,textarea').eq(field).focus();
      }.bind(this));
    }
  };

  return $.extend(App.Events, modal);
}());