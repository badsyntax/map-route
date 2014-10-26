#!/usr/bin/env bash
# provision.sh - Provision and start a dev server, used by Vagrant.
# DO NOT USE FOR PRODUCTION PROVISIONING

# Adjust apt mirrors for faster package downloads
sed -i "s/\/\/archive.ubuntu.com/\/\/gb.archive.ubuntu.com/g" /etc/apt/sources.list

# MySQL options
debconf-set-selections <<< 'mysql-server mysql-server/root_password password vagrant'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password vagrant'

# PHPMyAdmin options
debconf-set-selections <<< 'phpmyadmin phpmyadmin/dbconfig-install boolean false'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/reconfigure-webserver multiselect apache2'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/app-password-confirm password vagrant'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/mysql/admin-pass password vagrant'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/password-confirm password vagrant'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/setup-password password vagrant'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/database-type select mysql'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/mysql/app-pass password vagrant'

debconf-set-selections <<< 'dbconfig-common dbconfig-common/mysql/app-pass password vagrant'
debconf-set-selections <<< 'dbconfig-common dbconfig-common/mysql/app-pass password'
debconf-set-selections <<< 'dbconfig-common dbconfig-common/password-confirm password vagrant'
debconf-set-selections <<< 'dbconfig-common dbconfig-common/app-password-confirm password vagrant'
debconf-set-selections <<< 'dbconfig-common dbconfig-common/app-password-confirm password vagrant'
debconf-set-selections <<< 'dbconfig-common dbconfig-common/password-confirm password vagrant'

echo "Installing packages..."
apt-get update
apt-get install software-properties-common
add-apt-repository -y ppa:ondrej/php5-oldstable
apt-get update
apt-get upgrade -y

apt-get install -y git ruby-dev rubygems apache2 mysql-server \
  php5 php5 php5-mysql php5-curl php5-xdebug php-apc phpmyadmin

gem install --no-ri --no-rdoc sass compass

echo "Setting up Apache..."
a2enmod rewrite
rm /etc/apache2/sites-enabled/000-default
ln -s /var/www/apache/maproute.cc.local /etc/apache2/sites-enabled/
service apache2 restart

echo "Setting up PHP..."
echo "date.timezone = Europe/London" >> /etc/php5/cli/php.ini
echo "date.timezone = Europe/London" >> /etc/php5/apache2/php.ini

echo "Setting up application..."
cd /var/www
git submodule update --init --recursive
mkdir application/cache application/logs httpdocs/assets/cache
chmod -R 777 application/cache application/logs httpdocs/assets/cache
php composer.phar install

echo "Setting up application database..."
echo "create database maproute" | mysql -u root -pvagrant
cd /var/www/httpdocs && ./minion migrations:run

echo "All done!"