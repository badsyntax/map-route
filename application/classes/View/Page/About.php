<?php defined('SYSPATH') or die('No direct script access.');

class View_Page_About extends View_Layout
{
	public function __construct()
	{
		parent::__construct();

		$this->navigation = Kostache::factory()->render(
			new View_Public_Partials_Navigation('about')
		);
	}
}