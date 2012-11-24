<?php

class Model_Marker extends ORM {

	protected $_belongs_to = array(
		'user' => array('model' => 'User'),
	);
	
}