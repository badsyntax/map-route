<VirtualHost *:80>

	DocumentRoot	/home/richard/Projects/maproute.cc/httpdocs
	ServerName	maproute.cc

 	UseCanonicalName On

  #CustomLog /home/richard/www/logs/maproute.proxima.cc-alogs combined
  #ErrorLog /home/richard/www/logs/maproute.proxima.cc-elogs

  # Set the environment
  SetEnv KOHANA_ENV production

  # Secure the dev area
  #<DirectoryMatch /home/richard/www/sites/maproute.proxima.cc/httpdocs>
  #    AuthType Basic
  #    AuthName "Restricted Area"
  #    AuthUserFile /etc/apache2/users
  #    Require valid-user
  #</DirectoryMatch>

</VirtualHost>