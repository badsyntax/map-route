<?php defined('SYSPATH') or die('No direct script access.');

class Model_Asset extends ORM {

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'user',
			'foreign_key' => 'user_id'
		),
	);

	public function rules()
	{
		return array(
			/*
			'filename' => array(
				array('not_empty'),
				array('max_length', array(':value', array(128))),
				array(array($this, 'filename_empty'))
			),
			'description' => array(
				array('not_empty'),
				array('max_length', array(':value', array(255))),
			)
			*/
		);
	}

	public function save_uploaded($file = array())
	{
		$data = array(
			'user_id'           => Auth::instance()->get_user()->id,
			'filename'          => basename($file['path']),
			'screen_filename'   => basename($file['screen']),
			'thumb_filename'    => basename($file['thumb']),
		);

		$this->values($data);
		$this->save();
	}

} // End Model_Asset