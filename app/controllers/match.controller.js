/**
 * Copyright 2018 (C) whistler
 * Created on: 21/03/18
 * Author: Kavin Varnan
 */

const errorGenerator = require('../error/error.factory');
const errorCodes = require('../error/error.codes').errorCodes;
const matchModel = require('../model/matches.model');
const logger = require('../logger/logger');
const overAllPointsModel = require('../model/overallpoints.model');

class MatchController {
  constructor() {

  }

  async getHappeningSchedule(req, res) {
    try {
      const dummyTimeStamp = 1525188784;
      const realTimeStamp = new Date().getTime() / 1000;
      const schedule = await matchModel.getHappeningSchedule(dummyTimeStamp);
      const responseSchedule = [];
      for (let i = 0; i < schedule.length; i++) {
        const sc = schedule[i].toObject();
        sc.team_a = sc.teams.a.key;
        sc.team_b = sc.teams.b.key;
        sc.team_a_name = sc.teams.a.name;
        sc.team_b_name = sc.teams.b.name;
        delete sc.teams;
        responseSchedule.push(sc);
      }
      res.status(200).json({ schedule: responseSchedule })
    } catch(err) {
      console.log(err);
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }

  async getMatchSchedule(req, res) {
    try {
      const schedule = await matchModel.getSchedule();
      const responseSchedule = [];
      for (let i = 0; i < schedule.length; i++) {
        const sc = schedule[i].toObject();
        sc.team_a = sc.teams.a.key;
        sc.team_b = sc.teams.b.key;
        sc.team_a_name = sc.teams.a.name;
        sc.team_b_name = sc.teams.b.name;
        const sd = new Date((sc.start_date_timestamp * 1000) + (1000 * 60 * 30));
        const weekday = new Array(7);
        weekday[0] =  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        sc.displayDate = `${sd.getDate()}/${sd.getMonth() + 1} - ${weekday[sd.getDay()]}`;
        sc.displayTime = `${sd.getHours()}:${sd.getMinutes()}0`;
        delete sc.teams;
        responseSchedule.push(sc);
      }
      res.status(200).json({ schedule: responseSchedule })
    } catch(err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }

  async updateMatchSchedule(seasonResponse) {
    try {
      if (seasonResponse.status) {
        const matches = seasonResponse.data.season.matches;
        let arr = [];
        for (let key in matches) {
          if (matches.hasOwnProperty(key)) {
            let mat = matches[key];
            mat.start_date = new Date(new Date(mat.start_date.iso).getTime() - (1000 * 60 * 30) );
            mat.approx_end_date = new Date(new Date(mat.start_date).getTime() + (1000 * 60 * 420) );
            mat.start_date_timestamp = new Date(mat.start_date).getTime() / 1000;
            mat.approx_end_date_timestamp = new Date(mat.approx_end_date).getTime() / 1000;
            arr.push(mat);
          }
        }
        await matchModel.updateMatches(arr);
      }
    } catch (err) {
      logger.error("Failed to update matches");
    }

  }

  async getAllMatchPointsForUser(req, res) {
    try {
      const season = 'iplt20_2018';
      const uid = req.params.uid;
      const allMatches = await matchModel.getAllMatchesForSeason(season);
      const overAllPointsObj = await overAllPointsModel.getForUser(uid);
      let response = [];
      for (let i = 0; i < allMatches.length; i++) {
        let points = overAllPointsObj['individual'][allMatches[i].key];
        points = points ? points : 0;
        let mat = allMatches[i].toObject();
        const obj = {match: mat.short_name, key: mat.key, points };
        response.push(obj);
      }
      res.status(200).json({ allMatches: response });
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }

  async getSomeMatchToDisplay(req, res) {
    try {
      const schedule = await matchModel.getSomeMatchToDisplay();
      const responseSchedule = [];
      for (let i = 0; i < 1; i++) {
        const sc = schedule;
        sc.team_a = sc.teams.a.key;
        sc.team_b = sc.teams.b.key;
        sc.team_a_name = sc.teams.a.name;
        sc.team_b_name = sc.teams.b.name;
        delete sc.teams;
        responseSchedule.push(sc);
      }
      res.status(200).json({ schedule: responseSchedule })
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }
}

module.exports = new MatchController();
