<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Home extends Controller_Base {

  public $master_view = 'master/page';

	public function action_index()
	{
    $this->template->set('content', View::factory('pages/home'));
	}

} // End Welcome
