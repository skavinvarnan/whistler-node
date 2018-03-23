/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const mongoose = require('mongoose');
const runsModel = require('../model/runs.model');
const errorCodes = require('../error/error.codes').errorCodes;

class PredictionsModel {
  constructor() {
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
    }, { strict: true });

    this.model = mongoose.model('prediction', schema);
  }

  async savePrediction(uid, match_key, team, over, runs) {
    const prediction = await this.model.findOne({ uid, match_key });
    if (!prediction) {
      return await this.createNewPrediction(uid, match_key, team, over, runs)
    } else {
      const key = `${team}_${over}`;
      if (prediction[key] !== -1) {
        return errorCodes.CONFLICT;
      }
      prediction[key] = runs;
      return await this.model.update({ uid, match_key }, prediction);
    }
  }

  async createNewPrediction(uid, match_key, team, over, runs) {
    const runsObj = await runsModel.getRuns(match_key);
    if (!runsObj) {
      return null;
    }

    const data = { uid, match_key, team_a: runsObj['team_a'], team_b: runsObj['team_b'],
      a_1: -1, a_2: -1, a_3: -1, a_4: -1, a_5: -1, a_6: -1, a_7: -1, a_8: -1, a_9: -1, a_10: -1,
      a_11: -1, a_12: -1, a_13: -1, a_14: -1, a_15: -1, a_16: -1, a_17: -1, a_18: -1, a_19: -1, a_20: -1,
      b_1: -1, b_2: -1, b_3: -1, b_4: -1, b_5: -1, b_6: -1, b_7: -1, b_8: -1, b_9: -1, b_10: -1,
      b_11: -1, b_12: -1, b_13: -1, b_14: -1, b_15: -1, b_16: -1, b_17: -1, b_18: -1, b_19: -1, b_20: -1 };

    const key = `${team}_${over}`;
    data[key] = runs;
    const objToSave = this.model(data);
    let savedObj = await objToSave.save();
    return savedObj;
  }

  async initNewPrediction(uid, match_key) {

  }

}

module.exports = new PredictionsModel();
