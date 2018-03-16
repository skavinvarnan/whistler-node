/**
 * Copyright 2018 (C) whistler
 * Created on: 13/03/18
 * Author: Kavin Varnan
 */
const winston = require('winston');
require('winston-daily-rotate-file');
const config = require('../config/config');

const logger = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.Console)({
      colorize: true,
    }),
    new winston.transports.DailyRotateFile({
      filename: config.log.fileName,
      dirname: config.log.dir,
      maxsize: 20971520, // 20MB
      maxFiles: 25,
      datePattern: '.dd-MM-yyyy',
    }),
  ],
});

module.exports = logger;
