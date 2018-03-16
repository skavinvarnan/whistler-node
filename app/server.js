/**
 * Copyright 2018 (C) whistler
 * Created on: 13/03/18
 * Author: Kavin Varnan
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const keygen = require('keygenerator');

const connectToMongoDb = require('./mongo/mongo.connect').connectToDb;
const logger = require('./logger/logger');
const config = require('./config/config');
const baseRoute = require('./routes/base.route');
const errorResponse = require('./error/error.codes').errorResponse;

const scheduledRunner = require('./runner/scheduled.runner');

const port = config.serverPort;
logger.stream = {
  write(message, encoding) { // eslint-disable-line no-unused-vars
    logger.info(message);
  },
};

function startServer() {
  return new Promise((resolve) => {
    try {
      const app = express();
      const server = http.Server(app);

      app.use(cors());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended: true}));

      app.use(morgan('dev', {stream: logger.stream}));

      app.use('/api', baseRoute);

      // Index route
      app.get('/', (req, res) => {
        res.status(200).json(errorResponse.INVALID_ENDPOINT);
      });

      server.listen(port, () => {
        logger.info('server started - ', port);
      });
      resolve();
    } catch (err) {
      logger.error('Error starting server');
      process.exit(1);
    }
  });
}

// Start main server
connectToMongoDb()
  .then(startServer)
  .then(() => {
    // Server started
    // scheduledRunner.startAccessTokenRunner();
    // scheduledRunner.startMatchRunner();
  });


// // Start runner server
// connectToMongoDb()
//   .then(startServer)
//   .then(() => {
//     // Server started
//   });
