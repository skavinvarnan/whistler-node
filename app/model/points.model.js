/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const mongoose = require('mongoose');

class PointsModel {
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

    this.model = mongoose.model('points', schema);
  }

  async createUser(name, uid) {
    const objToSave = this.model({ name, uid });
    let savedObj = await objToSave.save();
    return savedObj;
  }
}

module.exports = new PointsModel();
