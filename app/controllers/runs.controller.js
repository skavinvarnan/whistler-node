/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const errorGenerator = require('../error/error.factory');
const errorCodes = require('../error/error.codes').errorCodes;
const runsModel = require('../model/runs.model');
const redis = require('../redis/redis.connect');
const runsFactory = require('../factory/runs.factory');
const schheduledRunner = require('../runner/scheduled.runner');

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

  async scoreBoard(req, res) {
    try {
      const matchKey = req.params.matchKey;
      const string = await redis.get(matchKey);
      const obj = JSON.parse(string);
      if (obj == null) {
        await schheduledRunner.forceFetchMatchRecord(matchKey);
        const string = await redis.get(matchKey);
        const obj = JSON.parse(string);
        if (obj == null) {
          errorGenerator(errorCodes.NOT_FOUND, null, 500, 'Internal server error', res);
        } else {
          res.status(200).json({scoreBoard: obj});
        }
      } else {
        res.status(200).json({scoreBoard: obj});
      }
    } catch(err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }

  async groupUpdateRunsOnDb(matchKey, team, overRunsArray, responseObj) {
    let first_batting = '';
    let is_toss_done = false;
    let is_started = false;
    let innings_number = 'other';
    let is_completed = false;

    if (responseObj.data.card.first_batting) {
      first_batting = responseObj.data.card.first_batting;
      is_toss_done = true;
    }

    if (responseObj.data.card.innings && !this.isEmpty(responseObj.data.card.innings)) {
      is_started = true;
    }

    if (responseObj.data.card.approx_completed_ts) {
      is_completed = true;
    }

    if ( (!responseObj.data.card.now.req || this.isEmpty(responseObj.data.card.now.req)) && is_started) {
      innings_number = 'first';
    } else if (responseObj.data.card.now.req && !this.isEmpty(responseObj.data.card.now.req) && !is_completed) {
      innings_number = 'second';
    } else {
      innings_number = 'other';
    }

    const matchObj = await runsModel.groupUpdateRuns(matchKey, team, overRunsArray,
      is_toss_done, is_started, innings_number, is_completed, first_batting);
    return matchObj;
  }

  async computeRunsForResponse(responseObj) {
    if (responseObj.status) {
      let dbUpdateOversAndRuns = [];
      responseObj.data.card.now.recent_overs = this.rearrangeRecentOvers(responseObj.data.card.now.recent_overs);
      for (let i = 0; i < responseObj.data.card.now.recent_overs.length; i++) {
        const overNumber = responseObj.data.card.now.recent_overs[i][0];
        let runs = 0;
        for (let j = 0; j < responseObj.data.card.now.recent_overs[i][1].length; j++) {
          runs = runs + responseObj.data.card.balls[responseObj.data.card.now.recent_overs[i][1][j]].runs;
        }
        if (i === 0) {
          if (responseObj.data.card.approx_completed_ts || // Scenario to handle for second innings
            responseObj.data.card.status_overview === 'innings_break') { // Scenario to handle first innings
            dbUpdateOversAndRuns.push({over: overNumber, runs, over_finished: true});
          } else {
            dbUpdateOversAndRuns.push({over: overNumber, runs, over_finished: false});
          }
        } else {
          dbUpdateOversAndRuns.push({over: overNumber, runs, over_finished: true});
        }
      }
      this.groupUpdateRunsOnDb(responseObj.data.card.key, responseObj.data.card.now.batting_team, dbUpdateOversAndRuns, responseObj);
    }
  }

  rearrangeRecentOvers(recentOver) {
    return recentOver.sort(this.predicateBy());
  }

  predicateBy(){
    return function(a, b){
      if( a[0] < b[0]){
        return 1;
      }else if( a[0] > b[0] ){
        return -1;
      }
      return 0;
    }
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

}

module.exports = new RunsController();
