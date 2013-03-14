/* Modal viewmodel
 *************************/

App.ViewModels.Modal = function(container, controller) {
  this.container = container;
  this.controller = controller;
  this.defaultValues();
};

App.ViewModels.Modal.inherit(App.ViewModels.Base, {
  defaultValues: function(data) {
    this.values($.extend({
      heading: 'Info',
      content: '',
      controls: true,
      buttons: [{
        title: 'Okay',
        type: 'btn-primary',
        action: ''
      }]
    }, data));
  }
});