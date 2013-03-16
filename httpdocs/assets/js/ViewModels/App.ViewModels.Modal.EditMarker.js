App.ViewModels.Modal.EditMarker = function(model) {
  this.setObservables(model);
};

App.ViewModels.Modal.EditMarker.inherit(App.ViewModels.Base, {
  setObservables: function(model) {
    this.values({
      pendingRequest: false,
      model: model,
      photos: [],
      state: 'list',
      viewPhoto: false
    })
  },
  loadPhotos: function() {

    var self = this;

    this.viewPhoto(false);
    this.pendingRequest(true);

    new App.Models.Photo().findAll(function() {
      self.pendingRequest(false);
      self.photos(this.photos());
    });
  },
  removePhoto: function(photo, callback) {
    photo.remove(callback);
  }
});