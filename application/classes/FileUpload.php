<?php defined('SYSPATH') or die('No direct script access.');

use Aws\Common\Aws;
use Aws\S3\S3Client;

class FileUpload {

  protected $field_name;
  protected $files;
  protected $data;
  protected $user;
  protected $uploaded;

  public function __construct($field_name = array(), $files = array(), $data = array())
  {
    $this->field_name = $field_name;
    $this->files = $files;
    $this->data = $data;
    $this->user = Auth::instance()->get_user();
    $this->s3_config = Kohana::$config->load('site.s3');
    $this->s3 = S3Client::factory($this->s3_config);
    $this->process_file();
  }

  public static function factory($field_name = array(), $files = array(), $data = array())
  {
    return new FileUpload($field_name, $files, $data);
  }

  public function rules()
  {
    return array(
      array('Upload::not_empty', array(':value')),
      array('Upload::valid'),
      array('Upload::size', array(':value', '10M')),
      array('Upload::type', array(':value', array('jpg', 'png')))
    );
  }

  protected function process_file()
  {
    $file = $this->files[$this->field_name];

    if (!$this->validate($file))
    {
      $this->failed[] = $file;
      return;
    }

    $this->get_file_info($file);
    $this->move_file($file);
    $this->create_thumbs($file);
    $this->upload_to_s3($file);
    $this->remove_files($file);
    $this->uploaded = $file;
  }

  protected function get_file_info(&$file)
  {
    $file['path'] = $this->file_path($file);
    $file['extension'] = $this->extension($file);
    $file['filename'] = $this->file_name($file);
  }

  protected function extension($file)
  {
    $fileinfo = explode('.', $file['name']);
    return end($fileinfo);
  }

  protected function cache_path()
  {
    return APPPATH.'cache/';
  }

  protected function file_path($file, $prefix='')
  {
    return $this->cache_path().$this->file_name($file, $prefix);
  }

  protected function file_name($file, $prefix='')
  {
    return $this->user->id.'.'.time().'.'.($prefix !== '' ? $prefix.'.' : '').$file['name'];
  }

  protected function move_file(&$file)
  {
    move_uploaded_file($file['tmp_name'], $file['path']);
  }

  protected function validate(&$file)
  {
    $validation = Validation::factory(array($this->field_name => $file));
    $validation->rules($this->field_name, $this->rules());

    if ($validation->check() === FALSE)
    {
      $file['validation_errors'] = $validation->errors('upload');
      return FALSE;
    }

    return TRUE;
  }

  protected function create_thumbs(&$file)
  {
    $file['thumb'] = $this->file_path($file, 'thumb');
    $file['screen'] = $this->file_path($file, 'screen');

    Image::factory($file['path'], 'Imagick')
      ->resize(300, 300, Image::AUTO)
      ->save($file['thumb'], 80);
    
    Image::factory($file['path'], 'Imagick')
      ->resize(1000, 1000, Image::AUTO)
      ->save($file['screen'], 80);
  }

  protected function upload_to_s3(&$file)
  {
    $bucket = 'maproute-local-photos';

    // Original photo
    $this->s3->putObject(array(
      'Bucket' => $bucket,
      'Key'    => basename($file['path']),
      'Body'   => fopen($file['path'], 'r+'),
      'ACL'    => 'public-read'
    ));

    // Screen
    $this->s3->putObject(array(
      'Bucket' => $bucket,
      'Key'    => basename($file['screen']),
      'Body'   => fopen($file['screen'], 'r+'),
      'ACL'    => 'public-read'
    ));

    // Thumb
    $this->s3->putObject(array(
      'Bucket' => $bucket,
      'Key'    => basename($file['thumb']),
      'Body'   => fopen($file['thumb'], 'r+'),
      'ACL'    => 'public-read'
    ));
  }

  protected function remove_files($file)
  {
    unlink($file['path']);
    unlink($file['screen']);
    unlink($file['thumb']);
  }

  public function uploaded()
  {
    return $this->uploaded;
  }
}