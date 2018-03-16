/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const mongoose = require('mongoose');

class PredictionsModel {
  constructor() {
    const schema = new mongoose.Schema({
      uid: {
        type: String,
        required: true,
        index: true,
      },
      match: {
        type: String,
        required: true,
        index: true,
      },
      over: {
        type: Number,
        required: true,
      },
      runs: {
        type: Number,
        required: true,
      },
    }, { strict: true });

    this.model = mongoose.model('prediction', schema);
  }

  async savePrediction(uid, match, over, runs) {
    const prediction = await this.model.findOne({ uid, match, over });
    if (!prediction) {
      const objToSave = this.model({uid, match, over, runs});
      let savedObj = await objToSave.save();
      return savedObj;
    } else {
      return null;
    }
  }

  async checkIfPredicted(uid, match, over) {
    const prediction = await this.model.findOne({ uid, match, over });
    if (prediction) {
      return true;
    } else {
      return false;
    }
  }

}

module.exports = new PredictionsModel();
