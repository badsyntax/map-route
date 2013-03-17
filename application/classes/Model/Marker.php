<?php defined('SYSPATH') or die('No direct script access.');

class Model_Marker extends ORM
{
	protected $_belongs_to = array(
		'user' => array('model' => 'User'),
		'route' => array('model' => 'Route'),
	);

  protected $_has_many = array(
    'photos'      => array('model' => 'Photo'),
  );

  public function save(Validation $validation = NULL)
  {
    if ($this->date === NULL)
    {
      $this->date = time();
    }

    return parent::save($validation);
  }
}