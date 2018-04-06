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
const https = require('https');
const fs = require('fs');
const auth = require('http-auth');

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

const options = {
  key: fs.readFileSync('./app/ssl/privatekey.pem'),
  cert: fs.readFileSync('./app/ssl/certificate.pem'),
  ca: fs.readFileSync('./app/ssl/ca_bundle.pem'),
};

function startServer() {
  return new Promise((resolve) => {
    try {
      const app = express();
      let server;
      if (config.isProd) {
        server = https.createServer(options, app);
      } else {
        server = http.Server(app);
      }

      const basic = auth.basic({realm: 'Monitor Area'}, function(user, pass, callback) {
        callback(user === 'superman' && pass === 'virudhunagar');
      });

      // Set '' to config path to avoid middleware serving the html page (path must be a string not equal to the wanted route)
      const statusMonitor = require('express-status-monitor')({ path: '' });
      app.use(statusMonitor.middleware); // use the "middleware only" property to manage websockets

      app.use(cors());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended: true}));

      if (config.showHttpLogs) {
        app.use(morgan('dev', {stream: logger.stream}));
      }

      app.use('/api', baseRoute);

      app.get('/reports/yR7i1qT736qxdyvLbs02/AZskmUIOYGoguc9hIgpE/5g57U06TFkVrwc7dRMhK', auth.connect(basic), statusMonitor.pageRoute); // use the pageRoute property to serve the dashboard html page

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

if (config.isRunner) {
  // Start runner
  connectToMongoDb().
  then(() => {
    scheduledRunner.startAccessTokenRunner();
    scheduledRunner.startScheduleUpdateRunner();
    scheduledRunner.startMatchRunner();
    scheduledRunner.startPointsComputationRunner();
    logger.info("Runner started");
  });
} else {
  // Start main server
  connectToMongoDb()
    .then(startServer)
    .then(() => {
      // Server started
    });
}



