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

  async createInitialModel(req, res) {
    try {
      const matchKey = req.params.matchKey;
      const teamA = req.params.teamA;
      const teamB = req.params.teamB;
      const matchObj = await runsModel.createInitialModel(matchKey, teamA, teamB);
      res.status(200).json(matchObj);
    } catch(err) {
      errorGenerator(errorCodes.CONFLICT, err, 500, 'Internal server error', res);
    }
  }

  async updateRuns(req, res) {
    try {
      const matchKey = req.params.matchKey;
      const team = req.params.team;
      const over = req.params.over;
      const runs = req.params.runs;
      const matchObj = await runsModel.updateRuns(matchKey, team, over, runs);
      if (matchObj) {
        res.status(200).json({ info: 'success' });
      } else {
        errorGenerator(errorCodes.NOT_FOUND, err, 500, 'Internal server error', res);
      }
    } catch(err) {
      errorGenerator(errorCodes.CONFLICT, err, 500, 'Internal server error', res);
    }
  }

  async groupUpdateRunsOnDb(matchKey, team, overRunsArray) {
    const matchObj = await runsModel.groupUpdateRuns(matchKey, team, overRunsArray);
    return matchObj;
  }

  async matchResponseFromRunner(responseObj) {
    console.log(responseObj.data.card.now.next_ball);1
    let dbUpdateOversAndRuns = [];
    for (let i = 0; i < responseObj.data.card.now.recent_overs.length; i++) {
      const overNumber = responseObj.data.card.now.recent_overs[i][0];
      let runs = 0;
      for (let j = 0; j < responseObj.data.card.now.recent_overs[i][1].length; j++) {
        runs = runs + responseObj.data.card.balls[responseObj.data.card.now.recent_overs[i][1][j]].runs;
      }
      dbUpdateOversAndRuns.push({ over: overNumber, runs });
    }
    this.groupUpdateRunsOnDb(responseObj.data.card.key, responseObj.data.card.now.batting_team, dbUpdateOversAndRuns);
  }

}

module.exports = new RunsController();
