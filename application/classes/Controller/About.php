<?php defined('SYSPATH') or die('No direct script access.');

class Controller_About extends Controller_Base {

	public function action_index()
	{
		$this->content = new View_Page_About;		
	}
}