<?php

class Model_Path extends ORM {

	protected $_belongs_to = array(
		'route' => array('model' => 'Route'),
	);
	
}