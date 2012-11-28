<div id="modal-edit-marker-description" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 data-bind="text: heading"></h3>
  </div>
  <div class="modal-body">
    <form class="form-horizontal">
      <div class="control-group">
        <label class="control-label" for="inputTitle">Title</label>
        <div class="controls">
          <input type="text" id="inputTitle" placeholder="Title" class="input-xlarge" data-bind="value: title" />
        </div>
      </div>
      <div class="control-group">
        <label class="control-label" for="inputDescription">Description</label>
        <div class="controls">
          <textarea id="inputDescription" placeholder="Description" rows="5" class="input-xlarge" data-bind="value: description"></textarea>
        </div>
      </div>
    </form>
  </div>
  <div class="modal-footer">
    <button class="btn btn-primary btn-save">Save</button>
    <button class="btn" data-dismiss="modal">Cancel</button>
  </div>
</div>