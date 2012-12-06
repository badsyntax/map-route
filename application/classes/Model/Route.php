<?php defined('SYSPATH') or die('No direct script access.');

class Model_Route extends ORM 
{
	protected $_belongs_to = array(
		'user' => array('model' => 'User'),
	);
}