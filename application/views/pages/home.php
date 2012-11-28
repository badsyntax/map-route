<!-- Map canvas -->

<div id="map-canvas" class="map">
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

<div 
  id="toolbar-ui" 
  data-bind="template: { name: 'toolbar-template' }">
</div>
<div 
  id="modal-ui" 
  data-bind="template: { name: 'modal-template' }">
</div>
<div 
  id="modal-login-ui" 
  data-bind="template: { name: 'modal-login-template' }">
</div>
<div 
  id="modal-edit-marker-description" 
  data-bind="template: { name: 'modal-edit-marker-description-template' }">
</div>

<!-- Templates -->

<script type="text/html" id="toolbar-template">
<?php echo View::factory('pages/fragments/toolbar'); ?> 
</script>

<script type="text/html" id="modal-template">
<?php echo View::factory('pages/fragments/modal'); ?> 
</script>

<script type="text/html" id="modal-login-template">
<?php echo View::factory('pages/fragments/modal/login', array(
  'google_login' => $google_login
)); ?> 
</script>

<script type="text/html" id="modal-edit-marker-description-template">
<?php echo View::factory('pages/fragments/modal/marker/edit_description'); ?> 
</script>

<script type="text/html" id="map-infowindow-template">
<?php echo View::factory('pages/fragments/infowindow'); ?> 
</script>