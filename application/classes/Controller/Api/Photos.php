<?php defined('SYSPATH') or die('No direct script access.');

use Aws\Common\Aws;
use Aws\S3\S3Client;

class Controller_Api_Photos extends Controller_REST
{
	public function action_index()
	{
		$response = REST_Response::factory(array(
			'photos' => array()
		));

    $this->s3_config = Kohana::$config->load('site.s3');
    $this->s3 = S3Client::factory($this->s3_config);

		$this->send_response(200, 'application/json', $response);
	}

	public function action_create()
	{
		// Process uploaded files
		$files = FilesUpload::factory('files', $_FILES);

		// Save uploaded files to db
		foreach($files->uploaded() AS $file)
		{
			// ORM::factory('Asset')->save_uploaded($file);
		}

		return;

		$failed = $files_upload->failed();

		$this->send_response(201, 'application/json', REST_Response::factory(array(
			'id' => 0
		)));
	}	
}