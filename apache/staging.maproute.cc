<VirtualHost 78.46.128.168:80>
	
	DocumentRoot	/home/richard/www/sites/staging.maproute.cc/httpdocs
	ServerName	staging.maproute.cc

 	UseCanonicalName On

  CustomLog /home/richard/www/logs/staging.maproute.cc-alogs combined
  ErrorLog /home/richard/www/logs/staging.maproute.cc-elogs

  # Set the environment
  SetEnv KOHANA_ENV development

  # Secure the dev area
  <DirectoryMatch /home/richard/www/sites/staging.maproute.cc/httpdocs>
      AuthType Basic
      AuthName "Restricted Area"
      AuthUserFile /etc/apache2/users
      Require valid-user
  </DirectoryMatch>

  <IfModule mod_expires.c>
    ExpiresActive on

    # Perhaps better to whitelist expires rules? Perhaps.
    ExpiresDefault                          "access plus 1 month"

    # cache.appcache needs re-requests in FF 3.6 (thanks Remy ~Introducing HTML5)
    ExpiresByType text/cache-manifest       "access plus 0 seconds"

    # Your document html
    ExpiresByType text/html                 "access plus 0 seconds"

    # Data
    ExpiresByType application/json          "access plus 0 seconds"
    ExpiresByType application/xml           "access plus 0 seconds"
    ExpiresByType text/xml                  "access plus 0 seconds"

    # Feed
    ExpiresByType application/atom+xml      "access plus 1 hour"
    ExpiresByType application/rss+xml       "access plus 1 hour"

    # Favicon (cannot be renamed)
    ExpiresByType image/x-icon              "access plus 1 week"

    # Media: images, video, audio
    ExpiresByType audio/ogg                 "access plus 1 month"
    ExpiresByType image/gif                 "access plus 1 month"
    ExpiresByType image/jpeg                "access plus 1 month"
    ExpiresByType image/png                 "access plus 1 month"
    ExpiresByType video/mp4                 "access plus 1 month"
    ExpiresByType video/ogg                 "access plus 1 month"
    ExpiresByType video/webm                "access plus 1 month"

    # HTC files  (css3pie)
    ExpiresByType text/x-component          "access plus 1 month"

    # Webfonts
    ExpiresByType application/vnd.ms-fontobject "access plus 1 year"
    ExpiresByType application/x-font-ttf    "access plus 1 year"
    ExpiresByType application/x-font-woff   "access plus 1 year"
    ExpiresByType font/opentype             "access plus 1 year"
    ExpiresByType image/svg+xml             "access plus 1 year"

    # CSS and JavaScript
    ExpiresByType application/javascript    "access plus 10 years"
    ExpiresByType text/css                  "access plus 10 years"

    ExpiresByType image/x-icon            "access plus 1 year"

    </IfModule>

    # ----------------------------------------------------------------------
    # ETag removal
    # ----------------------------------------------------------------------

    # FileETag None is not enough for every server.
    <IfModule mod_headers.c>
      Header unset ETag
    </IfModule>

    # Since we're sending far-future expires, we don't need ETags for
    # static content.
    #   developer.yahoo.com/performance/rules.html#etags
    FileETag None

    # Rewrite "www.example.com -> example.com".
    <IfModule mod_rewrite.c>
      RewriteCond %{HTTPS} !=on
      RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
      RewriteRule ^ http://%1%{REQUEST_URI} [R=301,L]
    </IfModule>

    # Use UTF-8 encoding for anything served text/plain or text/html
    AddDefaultCharset utf-8

    # Force UTF-8 for a number of file formats
    AddCharset utf-8 .atom .css .js .json .rss .vtt .xml

    # "-Indexes" will have Apache block users from browsing folders without a
    # default document Usually you should leave this activated, because you
    # shouldn't allow everybody to surf through every folder on your server (which
    # includes rather private places like CMS system folders).

    <IfModule mod_autoindex.c>
      Options -Indexes
    </IfModule>

    # Block access to "hidden" directories or files whose names begin with a
    # period. This includes directories used by version control systems such as
    # Subversion or Git.
    <IfModule mod_rewrite.c>
      RewriteCond %{SCRIPT_FILENAME} -d [OR]
      RewriteCond %{SCRIPT_FILENAME} -f
      RewriteRule "(^|/)\." - [F]
    </IfModule>

    # Block access to backup and source files. These files may be left by some
    # text/html editors and pose a great security danger, when anyone can access
    # them.
    <FilesMatch "(\.(bak|config|dist|fla|inc|ini|log|psd|sh|sql|swp)|~)$">
      Order allow,deny
      Deny from all
      Satisfy All
    </FilesMatch>

    <IfModule mod_php5.c>
      php_value session.cookie_httponly true
    </IfModule>

    <IfModule mod_mime.c>
      AddType image/x-icon .ico
  </IfModule>

</VirtualHost>
