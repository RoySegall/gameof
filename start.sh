#!/usr/bin/env bash

# Install and start rethinkdb.
source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | tee /etc/apt/sources.list.d/rethinkdb.list
wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | apt-key add -
apt-get update
apt-get install -y rethinkdb --allow-unauthenticated
rethinkdb > /dev/null &

# Install dependencies.
cd server
npm install

# Prepare database
npm install -g gulp
gulp migrate:database
gulp migrate:tables
gulp migrate:content

# Unit testing
npm install -g mocha
cd testing
npm install
mocha
