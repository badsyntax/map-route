<?php

class Model_Route extends ORM {

	protected $_belongs_to = array(
		'user' => array('model' => 'User'),
	);
}