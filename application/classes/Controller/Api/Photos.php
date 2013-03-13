<?php defined('SYSPATH') or die('No direct script access.');

use Aws\Common\Aws;
use Aws\S3\S3Client;

class Controller_Api_Photos extends Controller_REST
{
	public function action_index()
	{
		$response_body = REST_Response::factory(array(
			'photos' => array()
		));

    $this->s3_config = Kohana::$config->load('site.s3');
    $this->s3 = S3Client::factory($this->s3_config);

		$this->send_response(200, 'application/json', $response_body);
	}

	public function action_create()
	{
		// Prcess the files and try upload them to S3
		$file_upload = FileUpload::factory('file', $_FILES);
		$file = $file_upload->uploaded();

		try 
		{
			// Try save the file data to the DB
			ORM::factory('Asset')->save_uploaded($file, $this->request->post());
		}
		catch(ORM_Validation_Exception $e)
		{
			// TODO: remove message in prod mode
			print_r($e->errors('upload'));
			throw HTTP_Exception::factory(500);
		}

		$response_body = REST_Response::factory(array(
			'files' => array(
					// We don't want to just return the $file as it contains to
					// much sensitive data.
					array(
						'name' => $file['name'],
						'size' => $file['size'],
						"type" => $file['type'],
					)
				)
			)
		);

		$this->send_response(200, 'application/json', $response_body);
	}	
}