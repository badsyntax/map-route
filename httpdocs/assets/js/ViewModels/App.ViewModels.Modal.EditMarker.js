App.ViewModels.Modal.EditMarker = function(model) {
  this.setObservables(model);
};

App.ViewModels.Modal.EditMarker.inherit(App.ViewModels.Base, {
  setObservables: function(model) {
    this.values({
      pendingRequest: false,
      model: model,
      photos: []
    })
  },
  loadPhotos: function() {
    var self = this;
    this.pendingRequest(true);
    new App.Models.Photo().findAll(function() {
      self.pendingRequest(false);
      self.photos(this.photos());
    });
  }
});