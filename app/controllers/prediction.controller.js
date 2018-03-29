/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const errorGenerator = require('../error/error.factory');
const errorCodes = require('../error/error.codes').errorCodes;
const predictionModel = require('../model/predictions.model');
const runsModel = require('../model/runs.model');
const redis = require('../redis/redis.connect');
const predictionFactory = require("../factory/prediction.factory");
const pointsModel = require("../model/points.model");

class PredictionController {
  constructor() {

  }

  async myPredictionTable(req, res) {
    try {
      const uid = req.headers.uid;
      const matchKey = req.params.matchKey;
      let prediction = await predictionModel.getPredictionForUser(matchKey, uid);
      if (!prediction) {
        prediction = await this.createPredictionForUser(matchKey, uid);
      }
      let points = await pointsModel.getPointsForUser(matchKey, uid);
      if (!points) {
        points = await this.createPointsForUser(matchKey, uid);
      }
      const runsObj = await runsModel.getRuns(matchKey);
      const response = predictionFactory.createUserPredictionTable(runsObj, prediction, points);
      res.status(200).json({ predictPointsTableData: response })
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }

  async userPredictionReport(req, res) {
    try {
      const uid = req.params.uid;
      const matchKey = req.params.matchKey;
      let prediction = await predictionModel.getPredictionForUser(matchKey, uid);
      if (!prediction) {
        prediction = await this.createPredictionForUser(matchKey, uid);
      }
      let points = await pointsModel.getPointsForUser(matchKey, uid);
      if (!points) {
        points = await this.createPointsForUser(matchKey, uid);
      }
      const runsObj = await runsModel.getRuns(matchKey);
      const response = predictionFactory.getUserPredictionReport(runsObj, prediction, points);
      res.status(200).json({ userPrediction: response })
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
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
          res.status(200).json({ success: true });
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

  async createPredictionForUser(matchKey, uid) {
    const prediction = await predictionModel.createPredictionForUser(matchKey, uid);
    return prediction;
  }

  async createPointsForUser(matchKey, uid) {
    const points = await pointsModel.createPointsForUser(matchKey, uid);
    return points;
  }
}

module.exports = new PredictionController();
