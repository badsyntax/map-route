<!-- Map canvas -->

<div id="map-canvas">
  <div class="message">
    <div class="has-js">
      Loading map...
    </div>
    <div class="no-js">
      <strong>You need to enable Javascript in your browser to use this application.</strong>
    </div>
  </div>
</div>

<!-- Layout -->

<div id="toolbar-ui" data-bind="template: { name: 'toolbar-template' }"></div>
<div id="modal-ui" data-bind="template: { name: 'modal-template' }"></div>

<!-- Templates -->

<script type="text/html" id="toolbar-template">
<div id="toolbar" class="toolbar btn-toolbar" data-toggle="buttons-radio">
  <div class="btn-group" data-bind="foreach: buttons">
    <button data-bind="attr: { 'class': 'btn ' + className() }, html: caption()">
    </button>
  </div>
</div> 
</script>

<script type="text/html" id="modal-template">
<div id="modal" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 data-bind="text: heading"></h3>
  </div>
  <div class="modal-body">
    <p data-bind="text: content"></p>
  </div>
  <div class="modal-footer">
    <button class="btn btn-primary" data-dismiss="modal">Okay</button>
  </div>
</div>
</script>