/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const mongoose = require('mongoose');
const runsModel = require('../model/runs.model');
const overAllPointsModel = require('../model/overallpoints.model');

class PointsModel {
  constructor() {
    this.teamRunsKey = ['a_1', 'a_2', 'a_3', 'a_4', 'a_5', 'a_6', 'a_7', 'a_8', 'a_9', 'a_10',
      'a_11', 'a_12', 'a_13', 'a_14', 'a_15', 'a_16', 'a_17', 'a_18', 'a_19', 'a_20', 'b_1', 'b_2', 'b_3', 'b_4', 'b_5', 'b_6', 'b_7', 'b_8', 'b_9', 'b_10',
      'b_11', 'b_12', 'b_13', 'b_14', 'b_15', 'b_16', 'b_17', 'b_18', 'b_19', 'b_20'];

    const schema = new mongoose.Schema({
      uid: { type: String, required: true, index: true },
      match_key: { type: String, required: true, index: true },
      team_a: { type: String, required: true },
      team_b: { type: String, required: true },
      a_1: { type: Number, required: true },
      a_2: { type: Number, required: true },
      a_3: { type: Number, required: true },
      a_4: { type: Number, required: true },
      a_5: { type: Number, required: true },
      a_6: { type: Number, required: true },
      a_7: { type: Number, required: true },
      a_8: { type: Number, required: true },
      a_9: { type: Number, required: true },
      a_10: { type: Number, required: true },
      a_11: { type: Number, required: true },
      a_12: { type: Number, required: true },
      a_13: { type: Number, required: true },
      a_14: { type: Number, required: true },
      a_15: { type: Number, required: true },
      a_16: { type: Number, required: true },
      a_17: { type: Number, required: true },
      a_18: { type: Number, required: true },
      a_19: { type: Number, required: true },
      a_20: { type: Number, required: true },
      b_1: { type: Number, required: true },
      b_2: { type: Number, required: true },
      b_3: { type: Number, required: true },
      b_4: { type: Number, required: true },
      b_5: { type: Number, required: true },
      b_6: { type: Number, required: true },
      b_7: { type: Number, required: true },
      b_8: { type: Number, required: true },
      b_9: { type: Number, required: true },
      b_10: { type: Number, required: true },
      b_11: { type: Number, required: true },
      b_12: { type: Number, required: true },
      b_13: { type: Number, required: true },
      b_14: { type: Number, required: true },
      b_15: { type: Number, required: true },
      b_16: { type: Number, required: true },
      b_17: { type: Number, required: true },
      b_18: { type: Number, required: true },
      b_19: { type: Number, required: true },
      b_20: { type: Number, required: true },
      total_for_match: { type: Number, required: true },
    }, { strict: true });

    this.model = mongoose.model('points', schema);
  }


  async createPointsForUser(match_key, uid) {
    const runsObj = await runsModel.getRuns(match_key);
    if (!runsObj) {
      return null;
    }

    const data = { uid, match_key, team_a: runsObj['team_a'], team_b: runsObj['team_b'],
      a_1: 0, a_2: 0, a_3: 0, a_4: 0, a_5: 0, a_6: 0, a_7: 0, a_8: 0, a_9: 0, a_10: 0,
      a_11: 0, a_12: 0, a_13: 0, a_14: 0, a_15: 0, a_16: 0, a_17: 0, a_18: 0, a_19: 0, a_20: 0,
      b_1: 0, b_2: 0, b_3: 0, b_4: 0, b_5: 0, b_6: 0, b_7: 0, b_8: 0, b_9: 0, b_10: 0,
      b_11: 0, b_12: 0, b_13: 0, b_14: 0, b_15: 0, b_16: 0, b_17: 0, b_18: 0, b_19: 0, b_20: 0, total_for_match: 0 };

    const objToSave = this.model(data);
    let savedObj = await objToSave.save();
    savedObj = savedObj.toObject();
    return savedObj;
  }

  async updatePointsForUser(match_key, uid, over_name, pointsForUser) {
    const points = await this.model.findOne({ match_key, uid });
    if (points) {
      points[over_name] = pointsForUser;
      let totalPointsForMatch  = 0;
      for (let i = 0; i < this.teamRunsKey.length; i++) {
        totalPointsForMatch += points[this.teamRunsKey[i]];
      }
      points['total_for_match'] = totalPointsForMatch;
      await this.model.update({ match_key, uid }, points);
      await overAllPointsModel.updatePoints(uid, match_key, totalPointsForMatch);
    }
  }

  async getPointsForUser(match_key, uid) {
    let points = await this.model.findOne({ uid, match_key });
    if (points) {
      points = points.toObject();
      return points;
    } else {
      return null;
    }
  }

  async getPointsForUsersOnlyUidAndTotal(match_key, userList) {
    let resArr = await this.model.find({ match_key, uid: userList }).select('total_for_match uid');
    let arr = [];
    resArr.forEach(obj => {
      arr.push(obj.toObject());
    });
    return arr;
  }
}

module.exports = new PointsModel();
