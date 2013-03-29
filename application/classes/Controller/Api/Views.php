<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api_Views extends Controller_REST
{
	public function action_index()
	{
    if (Kohana::$environment === Kohana::DEVELOPMENT)
    {
      Cache::instance('apc')->delete_all();
    }

		if (!($view = Cache::instance('apc')->get('api_views', FALSE)))
		{
			$view = Kostache::factory()->render(new View_Page_Templates);
			Cache::instance('apc')->set('api_views', $view);
		}

		$this->send_response(200, 'text/html', $view);
	}
}