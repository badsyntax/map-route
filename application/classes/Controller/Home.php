<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Home extends Controller_Base {

	public function action_index()
	{
		$view_model = (Kohana::$environment === Kohana::PRODUCTION AND Kohana::$config->load('site.comingsoon'))
			? 'View_Page_Home_ComingSoon'
			: 'View_Page_Home';

    if ($this->user AND $this->user->loaded())
    {
      $view_model .= '_Edit';
    }

		$this->content = new $view_model;		
	}
}