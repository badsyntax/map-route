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
    if ($this->layout === NULL)
    {
      $body = Kostache::factory()->render($this->content);
    }
    else
    {
      $body = Kostache_Layout::factory($this->layout)->render($this->content);
    }
		$this->response->body($body);
	}
}