/**
 * Copyright 2018 (C) whistler
 * Created on: 13/03/18
 * Author: Kavin Varnan
 */

const path = require('path');

const config = {};

// Other config files
config.log = {};
config.log.dir = path.join(__dirname, '../../log');
config.log.fileName = 'app.log';

// Server config files
config.serverPort = process.env.serverPort || 7325;

//DB
config.database = {};

config.database.mongo = {
  port: 27017,
  host: '127.0.0.1',
  dbName: 'whistler',
  userName: 'developer',
  password: 'developer'
};

config.database.redis = {
  port: 6379,
  host: '127.0.0.1',
  family: 4,
  db: 0
};

module.exports = config;
