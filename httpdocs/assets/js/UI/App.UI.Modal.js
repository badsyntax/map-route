/* Modal UI
 *************************/
App.UI.Modal = (function() {
  return {
    setup: function(controller, container, viewModel) {
      this.controller = controller;
      this.container = container;
      this.viewModel = viewModel;
      this.modal = this.container.find('.modal');
    },
    show: function(message) {
      
      this.viewModel.content(message);

      this.modal
      .modal({
        show: true
      })
      .css({
        'margin-top': function () {
          return -($(this).height() / 2);
        }
      });
    }
  };
}());