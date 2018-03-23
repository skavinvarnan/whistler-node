/**
 * Copyright 2018 (C) whistler
 * Created on: 21/03/18
 * Author: Kavin Varnan
 */

const errorGenerator = require('../error/error.factory');
const errorCodes = require('../error/error.codes').errorCodes;
const matchModel = require('../model/matches.model');
const dumpMatchModel = require('../model/dumpmatch.model');
const redis = require('../redis/redis.connect');
const runsModel = require('../model/runs.model');

class TestController {
  constructor() {

  }

  async test(req, res) {
    try {
      // const body = req.body;
      // await redis.set('pslt20_2018_g28', JSON.stringify(body));
      // await dumpMatchModel.dumpMatch(body);
      const string = await redis.get('pslt20_2018_g28');

      res.status(200).json(JSON.parse(string));
    } catch(err) {
      errorGenerator(errorCodes.CONFLICT, err, 500, 'Internal server error', res);
    }
  }

  async createMatches(req, res) {
    try {
      const body = req.body;
      let arr = [];
      for (let key in body) {
        if (body.hasOwnProperty(key)) {
          let mat = body[key];
          mat.start_date = new Date(new Date(mat.start_date.iso).getTime() - (1000 * 60 * 30) );
          mat.approx_end_date = new Date(new Date(mat.start_date).getTime() + (1000 * 60 * 420) );
          mat.start_date_timestamp = new Date(mat.start_date).getTime() / 1000;
          mat.approx_end_date_timestamp = new Date(mat.approx_end_date).getTime() / 1000;
          arr.push(mat);
          // await matchModel.saveMatch(mat);
          // await runsModel.createInitialModel(mat.key, mat.teams.a.key, mat.teams.b.key)
        }
      }
      res.status(200).json(arr);

    } catch(err) {
      console.log(err);
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }
}

module.exports = new TestController();
