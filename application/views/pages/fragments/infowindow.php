<div class="info-window">
  <div>
    <strong data-bind="text: title"></strong>
  </div>
  <p data-bind="html: description"></p>
  <a href="#" class="add-description">
    <i class="icon-edit"></i> 
    <span data-bind="html: (description() ? 'Edit' : 'Add')"></span> description
  </a>
  <br />
  <a href="#" class="remove-pin">
    <i class="icon-remove"></i> Remove pin
  </a>
</div>