/**
 * Copyright 2018 (C) whistler
 * Created on: 13/03/18
 * Author: Kavin Varnan
 */

const path = require('path');

const config = {};

config.isProd = false;
config.showHttpLogs = true;

// Other config files
config.log = {};
config.log.dir = path.join(__dirname, '../../log');
config.log.fileName = 'app.log';

// Server config files
config.serverPort = 7325;

//DB
config.database = {};

config.database.mongo = {
  port: config.isProd ? 4825 : 27017,
  host: config.isProd ? '10.160.0.2' : '127.0.0.1',
  dbName: config.isProd ? 'whistler' : 'whistler',
  userName: config.isProd ? 'developer' : 'developer',
  password: config.isProd ? 'sWywMHzx9JWrEAqr': 'developer'
};

config.database.redis = {
  port: config.isProd ? 5483 : 6379,
  host: config.isProd ? '10.160.0.2' : '127.0.0.1',
  family: 4,
  password: config.isProd ? 'CPRSgmyE82LUhZS2' : 'LJTc88hs7qvMsZcP',
  db: 0
};

module.exports = config;
