<?php defined('SYSPATH') or die('No direct script access.');

class Model_Route extends ORM
{
	protected $_belongs_to = array(
		'user' => array('model' => 'User'),
	);

	protected $_has_many = array(
		'markers' => array('model' => 'Marker', 'foreign_key' => 'route_id')
	);

	public function rules()
	{
	 return array(
		'title' => array(
			array('not_empty'),
			array('min_length', array(':value', '3'))
		),
		'description' => array()
	 );
	}
}