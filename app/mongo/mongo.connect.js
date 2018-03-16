/**
 * Copyright 2018 (C) whistler
 * Created on: 13/03/18
 * Author: Kavin Varnan
 */

const mongoose = require('mongoose');
const logger = require('../logger/logger');
const config = require('../config/config');

const connectToDb = async () => {
  const userName = config.database.mongo.userName;
  const password = config.database.mongo.password;
  const host = config.database.mongo.host;
  const port = config.database.mongo.port;
  const name = config.database.mongo.dbName;
  try {
    // await mongoose.connect(`mongodb://${userName}:${password}@${host}:${port}/${name}`);
    await mongoose.connect(`mongodb://${host}:${port}/${name}`);
    logger.info('Connected to MongoDB!!!');
  } catch (err) {
    logger.error(`Could not connect to MongoDB. ${err}`);
    process.exit(1);
  }
};

module.exports = { connectToDb };
