<VirtualHost 78.46.128.168:80>
	DocumentRoot	/home/richard/www/sites/maproute.proxima.cc
	ServerName	maproute.proxima.cc

 	UseCanonicalName On

  CustomLog /home/richard/www/logs/maproute.proxima.cc-alogs combined
  ErrorLog /home/richard/www/logs/maproute.proxima.cc-elogs

  # Set the environment
  SetEnv KOHANA_ENV development

  # Secure the dev area
  <DirectoryMatch /home/richard/www/sites/maproute.proxima.cc>
      AuthType Basic
      AuthName "Restricted Area"
      AuthUserFile /etc/apache2/users
      Require valid-user
  </DirectoryMatch>

</VirtualHost>
