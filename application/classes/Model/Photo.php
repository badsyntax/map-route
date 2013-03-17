<?php defined('SYSPATH') or die('No direct script access.');

class Model_Photo extends ORM {

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User',
		),
		'marker' => array(
			'model' => 'Marker',
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

	public function s3_thumb_filename()
	{
		return 'https://s3-eu-west-1.amazonaws.com/maproute-local-photos/'.$this->thumb_filename;
	}

	public function s3_screen_filename()
	{
		return 'https://s3-eu-west-1.amazonaws.com/maproute-local-photos/'.$this->screen_filename;
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