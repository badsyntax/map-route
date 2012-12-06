<?php defined('SYSPATH') or die('No direct script access.');

class Model_Marker extends ORM 
{
	protected $_belongs_to = array(
		'user' => array('model' => 'User'),
		'route' => array('model' => 'Route'),
	);
}