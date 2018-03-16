/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const errorGenerator = require('../error/error.factory');
const errorCodes = require('../error/error.codes').errorCodes;
const predictionModel = require('../model/predictions.model');

class PredictionController {
  constructor() {

  }

  async savePrediction(req, res) {
    try {
      const uid = req.headers.uid;
      const match = req.params.match;
      const over = Number(req.params.over);
      const runs = Number(req.params.runs);
      const prediction = await predictionModel.savePrediction(uid, match, over, runs);
      if (prediction) {
        res.status(200).json(prediction);
      } else {
        errorGenerator(errorCodes.CONFLICT, 500, 'Internal server error', res);
      }
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, 500, 'Internal server error', res);
    }
  }
}

module.exports = new PredictionController();
