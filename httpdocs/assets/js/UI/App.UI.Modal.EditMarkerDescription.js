/* Modal UI
 *************************/
App.UI.Modal.EditMarkerDescription = (function(Modal) {
  return $.extend({}, Modal, {
    bindEvents: function() {
      Modal.bindEvents.call(this);
      this.container.on('click', '.btn-save', this.onButtonSaveClick.bind(this));
    },
    onButtonSaveClick: function(e) {
      this.trigger('save');
    }
  });
}(App.UI.Modal));
