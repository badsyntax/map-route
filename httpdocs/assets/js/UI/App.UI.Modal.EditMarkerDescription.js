/* Modal UI
 *************************/
App.UI.Modal.EditMarkerDescription = (function(Modal) {
  return $.extend({}, Modal, {
    bindEvents: function() {
      Modal.bindEvents.call(this);
      this.container.on('click', '.btn-save', this.onButtonSaveClick.bind(this));
      this.container.on('submit', 'form', this.onButtonSaveClick.bind(this));
    },
    onButtonSaveClick: function(e) {
      e.preventDefault();
      this.trigger('save');
    }
  });
}(App.UI.Modal));
