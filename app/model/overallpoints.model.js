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
      individual: { type: Object },
      over_all_points: { type: Number, required: true },
    }, { strict: false });

    this.model = mongoose.model('overall_points', schema);
  }

  async createOverAllPoints(uid) {
    const overAllPoints = await this.model.findOne({ uid });
    if (!overAllPoints) {
      const objToSave = this.model({uid, over_all_points: 0, individual: {'dummy': 0}});
      let savedObj = await objToSave.save();
      return savedObj;
    } else {
      return null;
    }
  }

  async getOverAllPointsWithUids(uids) {
    const resArr = await this.model.find({ uid: uids });
    let arr = [];
    resArr.forEach(obj => {
      arr.push(obj.toObject());
    });
    return arr;
  }

  async updatePoints(uid, match_key, points) {
    const overAllPoints = await this.model.findOne({ uid });
    if (overAllPoints) {
      overAllPoints['individual'][match_key] = points;
      let overAllPointsInt = 0;
      for (let key in overAllPoints['individual']) {
        if (overAllPoints['individual'].hasOwnProperty(key)) {
          overAllPointsInt += overAllPoints['individual'][key];
        }
      }
      overAllPoints['over_all_points'] = overAllPointsInt;
      await this.model.update({ uid }, overAllPoints);
    }
  }

  async getForUser(uid) {
    let obj = await this.model.findOne({ uid });
    obj = obj.toObject();
    return obj;
  }
}

module.exports = new PointsModel();
