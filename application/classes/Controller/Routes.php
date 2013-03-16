<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Routes extends Controller_Base {

	public function action_index()
	{
    $this->content = new View_Page_Routes;
	}

  public function action_view()
  {
    $id = $this->request->param('id');
    $section = $this->request->param('section');

    switch($section)
    {
      case 'view':
        $this->content = new View_Page_Routes_View($id);
      break;
      case 'gallery':
        $this->content = new View_Page_Routes_Gallery($id);
      break;
      default:
        throw HTTP_Exception::factory(404);
      break;
    }
  }
}