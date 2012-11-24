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
<div id="modal-login-ui" data-bind="template: { name: 'modal-login-template' }"></div>

<!-- Templates -->

<script type="text/html" id="toolbar-template">
<div id="toolbar" class="toolbar btn-toolbar" data-toggle="buttons-radio">
  <div class="btn-group" data-bind="foreach: buttons">
    <button 
      data-bind="attr: { 'class': 'btn ' + className(), 'data-original-title': caption() }" 
      data-placement="bottom" 
      rel="tooltip">
      <i data-bind="attr: { 'class': iconClassName() }" />
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

<script type="text/html" id="modal-login-template">
<div id="modal-login" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true">
 <div class="modal-header">
    <h3 data-bind="text: heading"></h3>
  </div>
  <div class="modal-body" style="text-align:center">
    <p>Please sign in before using MapRoute:</p>
    <p>
      <?php echo HTML::anchor($google_login, 'Sign in with Google &raquo;', array('class' => 'btn btn-primary btn-large')) ;?>
    </p>
  </div>  
</div>
</script>

<script type="text/html" id="map-infowindow-template">
<p>
  <a href="#" class="add-description">
    <i class="icon-edit"></i> Add description
  </a>
  <br />
  <a href="#" class="remove-pin">
    <i class="icon-remove"></i> Remove pin
  </a>
</p>
</script>