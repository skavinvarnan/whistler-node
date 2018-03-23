/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const errorGenerator = require('../error/error.factory');
const errorCodes = require('../error/error.codes').errorCodes;
const predictionModel = require('../model/predictions.model');
const runsModel = require('../model/runs.model');

class PredictionController {
  constructor() {

  }

  async savePrediction(req, res) {
    try {
      const uid = req.headers.uid;
      const matchKey = req.params.matchKey;
      const team = req.params.team;
      const over = Number(req.params.over);
      const runs = Number(req.params.runs);
      const canPredict = await this.canPredict(matchKey, team, over);
      if (canPredict) {
        const prediction = await predictionModel.savePrediction(uid, matchKey, team, over, runs);
        if (prediction) {
          if (prediction === errorCodes.CONFLICT) {
            errorGenerator(errorCodes.CONFLICT, null, 500, 'Internal server error', res);
          } else {
            res.status(200).json({info: 'success'});
          }
        } else {
          errorGenerator(errorCodes.NOT_FOUND, null, 500, 'Internal server error', res);
        }
      } else {
        errorGenerator(errorCodes.UNAUTHORISED, null, 500, 'Internal server error', res);
      }
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }

  async canPredict(matchKey, team, over) {
    const canPredict = await runsModel.canPredict(matchKey, team, over);
    return canPredict;
  }

  async checkAndCreatePredictionForUser(matchKey, user) {

  }
}

module.exports = new PredictionController();
