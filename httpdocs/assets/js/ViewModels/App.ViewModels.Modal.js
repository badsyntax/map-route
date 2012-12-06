/* Modal viewmodel
 *************************/

App.ViewModels.Modal = function() {
  this.defaultValues();
};

App.ViewModels.Modal.prototype.defaultValues = function(data) {
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
};

App.ViewModels.Modal.prototype.values = function(data) {
  ko.mapping.fromJS(data, null, this);
};