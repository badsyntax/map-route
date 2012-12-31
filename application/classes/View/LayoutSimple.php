<?php defined('SYSPATH') or die('No direct script access.');

class View_LayoutSimple
{
	public $title = 'Map Route';
	protected $environment = NULL;

	public function __construct()
	{
		$this->user = Auth::instance()->get_user();
		$this->logged_in = ($this->user AND $this->user->loaded());
		$this->device = new Device();
		$this->environment = Kohana::$environment === Kohana::PRODUCTION ? 'production' : 'development';
	}
}