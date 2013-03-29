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

		if (!($marker_id = $this->request->query('marker_id')))
		{
			throw new Exception('marker_id not specified.');
		}

		$photos = ORM::factory('Photo');
		$photos->where('user_id', '=', $this->user->id);
		$photos->where('marker_id', '=', $marker_id);
		$photos->order_by('date_uploaded', 'DESC');

		foreach($photos->find_all() as $photo)
		{
			$response_body->photos[] = (object) $photo->as_array();
		}

		$this->send_response(200, 'application/json', $response_body);
	}

	public function action_create()
	{
		// Process the files and upload them to S3
		$file_upload = FileUpload::factory('file', $_FILES);
		$file = $file_upload->uploaded();

		try
		{
			// Save the file data to the DB
			ORM::factory('Photo')->save_uploaded($file, $this->request->post());
		}
		catch(ORM_Validation_Exception $e)
		{
			if (Kohana::$environment === Kohana::DEVELOPMENT)
			{
				print_r($e->errors('upload'));
			}
			throw HTTP_Exception::factory(500);
		}

		$response_body = REST_Response::factory(array(
			'files' => array(
					// We don't want to just return the $file as it contains too
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

	public function action_delete()
	{
		$data = (array) json_decode($this->request->body());

		$photo = ORM::factory('Photo', $data['id']);

		if (!$photo->loaded())
		{
			throw HTTP_Exception::factory(500, 'Photo not found');
		}

		if ($photo->user_id !== $this->user->id)
		{
			throw HTTP_Exception::factory(401);
		}

		$photo->delete();

		$this->send_response(200);
	}
}