/**
 * Copyright 2018 (C) whistler
 * Created on: 26/03/18
 * Author: Kavin Varnan
 */

const mongoose = require('mongoose');

class PointsComputedModel {
  constructor() {
    const schema = new mongoose.Schema({
      match_key: { type: String, required: true, index: true },
      team_a: { type: String, required: true },
      team_b: { type: String, required: true },
      a_1: { type: Boolean, required: true },
      a_2: { type: Boolean, required: true },
      a_3: { type: Boolean, required: true },
      a_4: { type: Boolean, required: true },
      a_5: { type: Boolean, required: true },
      a_6: { type: Boolean, required: true },
      a_7: { type: Boolean, required: true },
      a_8: { type: Boolean, required: true },
      a_9: { type: Boolean, required: true },
      a_10: { type: Boolean, required: true },
      a_11: { type: Boolean, required: true },
      a_12: { type: Boolean, required: true },
      a_13: { type: Boolean, required: true },
      a_14: { type: Boolean, required: true },
      a_15: { type: Boolean, required: true },
      a_16: { type: Boolean, required: true },
      a_17: { type: Boolean, required: true },
      a_18: { type: Boolean, required: true },
      a_19: { type: Boolean, required: true },
      a_20: { type: Boolean, required: true },
      b_1: { type: Boolean, required: true },
      b_2: { type: Boolean, required: true },
      b_3: { type: Boolean, required: true },
      b_4: { type: Boolean, required: true },
      b_5: { type: Boolean, required: true },
      b_6: { type: Boolean, required: true },
      b_7: { type: Boolean, required: true },
      b_8: { type: Boolean, required: true },
      b_9: { type: Boolean, required: true },
      b_10: { type: Boolean, required: true },
      b_11: { type: Boolean, required: true },
      b_12: { type: Boolean, required: true },
      b_13: { type: Boolean, required: true },
      b_14: { type: Boolean, required: true },
      b_15: { type: Boolean, required: true },
      b_16: { type: Boolean, required: true },
      b_17: { type: Boolean, required: true },
      b_18: { type: Boolean, required: true },
      b_19: { type: Boolean, required: true },
      b_20: { type: Boolean, required: true },
    }, { strict: true });

    this.model = mongoose.model('points_computed', schema);
  }

  async createInitialModel(match_key, team_a, team_b) {
    const data = { match_key, team_a, team_b,
      a_1: false, a_2: false, a_3: false, a_4: false, a_5: false, a_6: false, a_7: false, a_8: false, a_9: false, a_10: false,
      a_11: false, a_12: false, a_13: false, a_14: false, a_15: false, a_16: false, a_17: false, a_18: false, a_19: false, a_20: false,
      b_1: false, b_2: false, b_3: false, b_4: false, b_5: false, b_6: false, b_7: false, b_8: false, b_9: false, b_10: false,
      b_11: false, b_12: false, b_13: false, b_14: false, b_15: false, b_16: false, b_17: false, b_18: false, b_19: false, b_20: false,
    };
    const objToSave = this.model(data);
    let savedObj = await objToSave.save();
    return savedObj;
  }

  async getForMatchKey(match_key) {
    let match = await this.model.findOne({ match_key });
    match = match.toObject();
    return match;
  }

  async updatePointsComputedForOver(match_key, overName) {
    const points = await this.model.findOne({ match_key });
    if (points) {
      points[overName] = true;
      await this.model.update({ match_key }, points);
    }
  }

}

module.exports = new PointsComputedModel();
