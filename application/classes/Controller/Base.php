<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Base extends Controller {

	protected $content = NULL;
  protected $user;
  protected $layout = 'layout';

  public function before()
  {
    $this->user = Auth::instance()->get_user();
  }

	public function after()
	{
		$this->response->body(
			Kostache_Layout::factory($this->layout)->render($this->content)
		);
	}
}