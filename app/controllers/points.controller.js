/**
 * Copyright 2018 (C) whistler
 * Created on: 23/03/18
 * Author: Kavin Varnan
 */

const overAllPointsModel = require('../model/overallpoints.model');

class PointsController {
  constructor() {

  }

  async checkAndCreatePointsForUser(matchKey, user) {

  }

  async createOverAllPointsForUser(uid) {
    await overAllPointsModel.createOverAllPoints(uid);
  }

}

module.exports = new PointsController();
