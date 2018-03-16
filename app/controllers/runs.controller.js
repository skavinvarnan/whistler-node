/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const errorGenerator = require('../error/error.factory');
const errorCodes = require('../error/error.codes').errorCodes;
const runsModel = require('../model/runs.model');

class RunsController {
  constructor() {

  }

  async saveRuns(req, res) {
    try {
      const match = req.params.match;
      const over = Number(req.params.over);
      const runs = Number(req.params.runs);
      const savedRuns = await runsModel.saveRuns(match, over, runs);
      if (savedRuns) {
        res.status(200).json(savedRuns);
      } else {
        errorGenerator(errorCodes.CONFLICT, 500, 'Internal server error', res);
      }
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, 500, 'Internal server error', res);
    }
  }

  async checkRunsExists(req, res) {
    try {
      const match = req.params.match;
      const over = Number(req.params.over);
      const isRunsExists = await runsModel.checkRunsExists(match, over);
      if (isRunsExists) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, 500, 'Internal server error', res);
    }
  }
}

module.exports = new RunsController();
