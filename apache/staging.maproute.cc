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
    ExpiresByType application/vnd.ms-fontobject "access plus 1 month"
    ExpiresByType application/x-font-ttf    "access plus 1 month"
    ExpiresByType application/x-font-woff   "access plus 1 month"
    ExpiresByType font/opentype             "access plus 1 month"
    ExpiresByType image/svg+xml             "access plus 1 month"

    # CSS and JavaScript
    ExpiresByType application/javascript    "access plus 1 year"
    ExpiresByType text/css                  "access plus 1 year"

    </IfModule>

</VirtualHost>
