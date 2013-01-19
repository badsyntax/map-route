<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Templates extends Controller_Base {

  protected $layout = NULL;

	public function action_index()
	{
    $this->content = new View_Page_Templates;   
	}

}