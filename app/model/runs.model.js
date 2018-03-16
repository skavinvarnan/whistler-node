/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const mongoose = require('mongoose');
const keygen = require('keygenerator');

class RunsModel {
  constructor() {
    const schema = new mongoose.Schema({
      matchKey: {
        type: String,
        required: true,
        index: true,
      },
      team: {
        type: String,
        required: true,
        index: true,
      },
      over: {
        type: Number,
        required: true,
        index: true,
      },
      runs: {
        type: Number,
        required: true,
      },
    }, { strict: true });

    this.model = mongoose.model('runs', schema);
  }

  async saveRuns(match, over, runs) {
    const runsObj = await this.model.findOne({ match, over, runs });
    if (!runsObj) {
      const objToSave = this.model({match, over, runs});
      let savedObj = await objToSave.save();
      return savedObj;
    } else {
      return null;
    }
  }

  async checkRunsExists(match, over) {
    const runsObj = await this.model.findOne({ match, over });
    if (runsObj) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = new RunsModel();
