<?php defined('SYSPATH') OR die('No direct access allowed.');

return array(
  'javascripts' => array(
    'root'       => DOCROOT,
    'dir'        => DOCROOT.'assets/cache',
    'gc'         => TRUE,
    'filemtime'  => TRUE,
    'compressor' => 'uglifyjs',
  ),
  'stylesheets' => array(
    'root'        => DOCROOT,
    'dir'         => DOCROOT.'assets/cache',
    'gc'          => TRUE,
    'filemtime'   => TRUE,
    'compressor'  => 'yui',
  ),
);
