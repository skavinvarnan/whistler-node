/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const errorGenerator = require('../error/error.factory');
const errorCodes = require('../error/error.codes').errorCodes;
const userModel = require('../model/user.model');
const pointsController = require('../controllers/points.controller');

class UserController {
  constructor() {

  }

  async init(req, res) {
    try {
      const name = req.params.name;
      const uid = req.headers.uid;
      await userModel.createOrUpdateUser(name, uid);
      await pointsController.createOverAllPointsForUser(uid);
      res.status(200).json({ success: true });
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }
}

module.exports = new UserController();
