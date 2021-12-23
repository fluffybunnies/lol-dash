#!/bin/bash

cd "$(dirname "$0")"

# fetch latest app version
git fetch && git checkout -f master && git pull origin master

# build
npm install
./node_modules/.bin/webpack

# stop server
forever stopall

# start server
PORT=443 forever start /var/www/lol-dash/server.js

