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
		$file = FileUpload::factory('file', $_FILES)->uploaded();

		ORM::factory('Asset')->save_uploaded($file);

		$this->send_response(200, 'application/json', REST_Response::factory(array(
			'files' => array(REST_Response::factory(array(
				'name' => $file['name'],
				'size' => $file['size'],
				"type" => $file['type'],
			))))
		));
	}	
}