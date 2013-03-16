<?php defined('SYSPATH') or die('No direct script access.');

class Model_Photo extends ORM {

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'user',
			'foreign_key' => 'user_id'
		),
		'marker' => array(
			'model' => 'marker',
			'foreign_key' => 'marker_id'
		),
	);

	public function rules()
	{
		return array(
			'marker_id' => array(
				array('not_empty'),
				array('numeric'),
			)
		);
	}

	public function save_uploaded($file = array(), $data = array())
	{
		$data = array_merge(
			$data,
			array(
				'user_id'           => Auth::instance()->get_user()->id,
				'filename'          => basename($file['path']),
				'screen_filename'   => basename($file['screen']),
				'thumb_filename'    => basename($file['thumb']),
			)
		);

		$this->values($data);
		$this->save();
	}

}