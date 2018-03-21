/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const errorGenerator = require('../error/error.factory');
const errorCodes = require('../error/error.codes').errorCodes;
const userModel = require('../model/user.model');

class UserController {
  constructor() {

  }

  async createUser(req, res) {
    try {
      const name = req.params.name;
      const uid = req.headers.uid;
      const user = await userModel.createUser(name, uid);
      res.status(200).json(user);
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }
}

module.exports = new UserController();
