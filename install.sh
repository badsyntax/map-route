#/usr/bin/env bash

git submodule update --init --recursive

mkdir application/cache
mkdir application/logs
mkdir httpdocs/assets/cache

sudo chmod -R 777 application/cache application/logs httpdocs/assets/cache
