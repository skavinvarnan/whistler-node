/**
 * Copyright 2018 (C) whistler
 * Created on: 15/03/18
 * Author: Kavin Varnan
 */

const config = require('./../config/config');
let r = require('ioredis');

let redis = new r({
  port: config.database.redis.port,
  host: config.database.redis.host,
  family: config.database.redis.family,
  password: config.database.redis.password,
  db: config.database.redis.db
});

module.exports = redis;
