/**
 * Copyright 2018 (C) whistler
 * Created on: 24/03/18
 * Author: Kavin Varnan
 */

const mongoose = require('mongoose');

class PointsModel {
  constructor() {
    const schema = new mongoose.Schema({
      uid: { type: String, required: true, index: true },
      over_all_points: { type: Number, required: true },
    }, { strict: false });

    this.model = mongoose.model('overall_points', schema);
  }

  async createOverAllPoints(uid) {
    const overAllPoints = await this.model.findOne({ uid });
    if (!overAllPoints) {
      const objToSave = this.model({uid, over_all_points: 0});
      let savedObj = await objToSave.save();
      return savedObj;
    } else {
      return null;
    }
  }
}

module.exports = new PointsModel();
