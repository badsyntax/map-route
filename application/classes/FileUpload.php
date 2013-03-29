<?php defined('SYSPATH') or die('No direct script access.');

use Aws\Common\Aws;
use Aws\S3\S3Client;

class FileUpload {

	protected $field_name;
	protected $files;
	protected $data;
	protected $user;
	protected $uploaded;
	protected $bucket;
	protected $sizes;

	public static function factory($field_name = array(), $files = array(), $data = array())
	{
		return new FileUpload($field_name, $files, $data);
	}

	public function __construct($field_name = array(), $files = array(), $data = array())
	{
		$this->id = time();
		$this->field_name = $field_name;
		$this->files = $files;
		$this->data = $data;
		$this->user = Auth::instance()->get_user();
		$this->s3_config = Kohana::$config->load('site.s3');
		$this->photos_config = Kohana::$config->load('site.photos');
		$this->bucket = $this->photos_config['s3bucket'][Kohana::$environment];
		$this->s3 = S3Client::factory($this->s3_config);

		$this->process_file();
	}

	public function rules()
	{
		return array(
			array('Upload::not_empty', array(':value')),
			array('Upload::valid'),
			array('Upload::size', array(':value', '10M')),
			array('Upload::type', array(':value', array('jpg', 'png', 'JPG', 'PNG')))
		);
	}

	protected function process_file()
	{
		$file = $this->files[$this->field_name];

		if (!$this->validate($file))
		{
			$this->failed[] = $file;
			return;
		}

		$this->get_file_info($file);
		$this->move_file($file);
		$this->create_thumbs($file);
		$this->upload_to_s3($file);
		$this->remove_files($file);
		$this->uploaded = $file;
	}

	protected function get_file_info(&$file)
	{
		$file['local_path'] = $this->local_paths($file);
		$file['s3_path'] = $this->s3_paths($file);
		$file['extension'] = $this->extension($file);
		$file['filename'] = $this->file_name($file);
	}

	protected function local_paths($file)
	{
		return array(
			'orig'  => $this->file_path($file),
			'thumb'  => $this->file_path($file, 'thumb'),
			'screen' => $this->file_path($file, 'screen')
		);
	}

	protected function s3_paths($file)
	{
		return array(
			'orig'   => $this->s3_file_path($file),
			'thumb'  => $this->s3_file_path($file, 'thumb'),
			'screen' => $this->s3_file_path($file, 'screen')
		);
	}

	protected function extension($file)
	{
		$fileinfo = explode('.', $file['name']);
		return end($fileinfo);
	}

	protected function cache_path()
	{
		return APPPATH.'cache/';
	}

	protected function file_path($file, $prefix='')
	{
		return $this->cache_path().$this->file_name($file, $prefix);
	}

	protected function s3_file_path($file, $prefix='')
	{
		return $this->file_name($file, $prefix, '/');
	}

	protected function file_name($file, $prefix='', $delimiter='.')
	{
		return $this->user->id.$delimiter.$this->id.$delimiter.($prefix !== '' ? $prefix.'.' : '').$file['name'];
	}

	protected function move_file(&$file)
	{
		move_uploaded_file($file['tmp_name'], $file['local_path']['orig']);
	}

	protected function validate(&$file)
	{
		$validation = Validation::factory(array($this->field_name => $file));
		$validation->rules($this->field_name, $this->rules());

		if ($validation->check() === FALSE)
		{
			if (Kohana::$environment === Kohana::DEVELOPMENT)
			{
				print_r($file);
			}
			$file['validation_errors'] = $validation->errors('upload');
			return FALSE;
		}

		return TRUE;
	}

	protected function create_thumbs(&$file)
	{
		// Thumbnail
		Image::factory($file['local_path']['orig'], 'Imagick')
			->resize($this->photos_config['sizes']['thumb'][0], $this->photos_config['sizes']['thumb'][1], Image::AUTO)
			->save($file['local_path']['thumb'], 80);

		// Screen
		Image::factory($file['local_path']['orig'], 'Imagick')
			->resize($this->photos_config['sizes']['screen'][0], $this->photos_config['sizes']['screen'][1], Image::AUTO)
			->save($file['local_path']['screen'], 80);
	}

	protected function upload_to_s3(&$file)
	{
		// Original photo
		$orig_model = $this->s3->putObject(array(
			'Bucket' => $this->bucket,
			'Key'    => $file['s3_path']['orig'],
			'Body'   => fopen($file['local_path']['orig'], 'r+'),
			'ACL'    => 'public-read'
		));

		// Screen res
		$this->s3->putObject(array(
			'Bucket' => $this->bucket,
			'Key'    => $file['s3_path']['screen'],
			'Body'   => fopen($file['local_path']['screen'], 'r+'),
			'ACL'    => 'public-read'
		));

		// Thumb res
		$this->s3->putObject(array(
			'Bucket' => $this->bucket,
			'Key'    => $file['s3_path']['thumb'],
			'Body'   => fopen($file['local_path']['thumb'], 'r+'),
			'ACL'    => 'public-read'
		));
	}

	protected function remove_files($file)
	{
		unlink($file['local_path']['orig']);
		unlink($file['local_path']['screen']);
		unlink($file['local_path']['thumb']);
	}

	public function uploaded()
	{
		return $this->uploaded;
	}
}