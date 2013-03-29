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
				'filename'          => $file['s3_path']['orig'],
				'screen_filename'   => $file['s3_path']['screen'],
				'thumb_filename'    => $file['s3_path']['thumb'],
			)
		);

		$this->values($data);
		$this->save();
	}

	public function delete()
	{
		$s3 = S3Client::factory(Kohana::$config->load('site.s3'));
		$bucket = Kohana::$config->load('site.photos.s3bucket')[Kohana::$environment];

		try
		{
			$s3->deleteObject(array(
				'Bucket' => $bucket,
				'Key' => $this->filename
			));
		}
		catch (Exception $e) {}

		try
		{
			$s3->deleteObject(array(
				'Bucket' => $bucket,
				'Key' => $this->screen_filename
			));
		}
		catch (Exception $e) {}

		try
		{
			$s3->deleteObject(array(
				'Bucket' => $bucket,
				'Key' => $this->thumb_filename
			));
		}
		catch(Exception $e) {}

		return parent::delete();
	}

}