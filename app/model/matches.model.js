/**
 * Copyright 2018 (C) whistler
 * Created on: 21/03/18
 * Author: Kavin Varnan
 */

const mongoose = require('mongoose');

class MatchModel {
  constructor() {
    const schema = new mongoose.Schema({
      key: {
        type: String,
        required: true,
        unique: true,
      },
      start_date: {
        type: String,
        required: true,
        index: true,
      },
      start_date_timestamp: {
        type: Number,
        required: true,
        index: true,
      },
      approx_end_date_timestamp: {
        type: Number,
        required: true,
        index: true,
      },
      approx_end_date: {
        type: String,
        required: true,
        index: true,
      },
    }, { strict: false });

    this.model = mongoose.model('matches', schema);
  }

  async saveMatch (obj) {
    const objToSave = this.model(obj);
    let savedObj = await objToSave.save();
    return savedObj;
  }

  async getSchedule() {
    const arr = await this.model.find().select('status name short_name venue winner_team msgs start_date start_date_timestamp teams related_name key');
    return arr;
  }

  async getHappeningSchedule(timeStamp) {
    const arr = await this.model.find({ start_date_timestamp: { $lt: timeStamp }, approx_end_date_timestamp: { $gt: timeStamp }, approx_completed_ts: {$exists: false} })
      .select('status name short_name venue winner_team msgs start_date start_date_timestamp teams related_name key');
    return arr;
  }

  async updateMatches(array) {
    for (let i = 0; i < array.length; i++) {
      await this.model.update({key: array[i].key}, array[i]);
    }
  }
}

module.exports = new MatchModel();