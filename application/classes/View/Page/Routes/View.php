<?php defined('SYSPATH') or die('No direct script access.');

class View_Page_Routes_View extends View_Layout
{
  public function __construct($id = NULL)
  {
    parent::__construct();

    $this->navigation = Kostache::factory()->render(
      new View_Public_Partials_Navigation('routes')
    );

    $this->route = ORM::factory('Route', $id);

    $this->markers = $this->route->markers->find_all();

    if (!$this->route->loaded())
    {
      throw new Exception('Route not found');
    }
  }
}