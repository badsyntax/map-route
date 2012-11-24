<?php

class Model_Pin extends Model {

	protected $_belongs_to = array(
		'user' => array('model' => 'User'),
	);
	
}