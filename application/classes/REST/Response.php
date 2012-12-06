<?php defined('SYSPATH') or die('No direct script access.');

class REST_Response
{
	public static function factory($properties = array())
	{
		$response = new StdClass();

		foreach($properties as $property => $value)
		{
			$response->{$property} = $value;
		}

		return $response;
	}
}