<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api_Photos extends Controller_REST
{
	public function action_index()
	{
		$response = REST_Response::factory(array(
			'photos' => array()
		));

		$this->send_response(200, 'application/json', $response);
	}

	public function action_create()
	{
		$files = FilesUpload::factory($_FILES, $this->request->post());
		
		$this->send_response(201, 'application/json', REST_Response::factory(array(
			'id' => 0
		)));
	}	
}

class FilesUpload {

	public function __construct($files = array(), $data = array())
	{
		$this->process_uploaded_files($files, $data);
	}

	public static function factory($files = array(), $data = array())
	{
		return new FilesUpload($files, $data);
	}

	public function process_uploaded_files($files = array(), $data = array(), $field_name = 'files')
	{
		$files = $files[$field_name];

		if (!isset($files) OR !is_array($files))
		{
			throw new Exception(__('No files were uploaded.'));
		}
	
		foreach($files['name'] as $index => $v)
		{
			$this->process_file(array(
				'name'     => $files['name'][$index],
				'type'     => $files['type'][$index],
				'tmp_name' => $files['tmp_name'][$index],
				'error'    => $files['error'][$index],
				'size'     => $files['size'][$index]
			));				
		}
	}

	public function process_file($file)
	{
		// $file = Validation::factory($file);

		// foreach($this->upload_rules($field_name) as $field => $rules)
		// {
		// 	$file->rules($field, $rules);
		// }

		// if ($file->check() === FALSE)
		// {
		// 	throw new Validation_Exception($file);
		// }

		// $name = strtolower($file['name']);
		// $path = DOCROOT.Kohana::$config->load('assets.upload_path');

		die($file['tmp_name']);

		// $file_path = Upload::save($file, $name, $path);

		// if ($file_path === FALSE)
		// {
			// throw new Exception(__('Unable to move the uploaded file.'));
		// }
	}
}