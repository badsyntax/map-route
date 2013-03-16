<?php defined('SYSPATH') or die('No direct script access.');

class View_Page_Routes extends View_Layout
{
  public function __construct()
  {
    parent::__construct();

    $this->navigation = Kostache::factory()->render(
      new View_Public_Partials_Navigation('routes')
    );
  }

  public function routes()
  {
    return ORM::factory('Route')->find_all();
  }
}